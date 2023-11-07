import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    login: FormGroup<{ username: FormControl<string | null>; password: FormControl<string | null> }>;

    error: string | undefined;

    constructor(private _router: Router) {
        this.login = new FormGroup<{ username: FormControl<string | null>; password: FormControl<string | null> }>({
            username: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required])
        });
    }

    ngOnInit(): void {
    }

    submit() {
        console.log(this.login);
    }

}