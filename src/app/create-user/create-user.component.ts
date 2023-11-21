import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EMPTY, catchError, take, tap } from "rxjs";
import { BackendService } from "../services/backend.service";

export type CreatePayload = {
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'user',
    customerName?: string
}

type CreatePayloadForm = {
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    role: FormControl<'admin' | 'user' | null>;
    customerName: FormControl<string | null>;
}

@Component({
    selector: 'create-user-component',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

    createUserForm: FormGroup<CreatePayloadForm>;

    error: string | undefined;

    constructor(private _router: Router, private _backendService: BackendService,) {
        this.createUserForm = new FormGroup<CreatePayloadForm>({
            name: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required]),
            role: new FormControl('user', [Validators.required]),
            customerName: new FormControl(null),
        });
    }

    ngOnInit(): void {
    }

    submit() {
        this.error = undefined;
        this._backendService.createUser(this.createUserForm.getRawValue() as CreatePayload).pipe(
            tap(_ => {
                this._router.navigate(['show_data']);
            }),
            catchError(err => {
                this.error = 'Create Failed';
                return EMPTY;
            }),
            take(1)
        ).subscribe();
    }
}