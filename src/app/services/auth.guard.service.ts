import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService {

    constructor(private _router: Router, private authService: AuthService) {

    }

    canActivate(): boolean {
        if (!this.authService.isLogged()) {
            alert('You are not allowed to view this page. You are redirected to login Page');

            this._router.navigate(["login"]);
            return false;
        }

        return true;
    }

}