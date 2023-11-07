import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { take, tap } from "rxjs";
import { AuthService, LoginPayloadType } from "../services/auth.service";
import { BackendService } from "../services/backend.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    login: FormGroup<{ email: FormControl<string | null>; password: FormControl<string | null> }>;

    error: string | undefined;

    constructor(private _router: Router, private _authService: AuthService,
        private _backendService: BackendService,) {
        this.login = new FormGroup<{ email: FormControl<string | null>; password: FormControl<string | null> }>({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required])
        });
    }

    ngOnInit(): void {
    }

    submit() {
        this._authService.login(this.login.getRawValue() as LoginPayloadType).pipe(
            tap(token => {
                console.log(token);
                this._backendService.setAuthToken(token);
                this._router.navigate(['show_data']);
            }),
            take(1)
        ).subscribe();
    }

}