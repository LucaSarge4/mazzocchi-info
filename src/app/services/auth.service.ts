import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, tap } from "rxjs";

export type LoginPayloadType = { email: string, password: string };

@Injectable()
export class AuthService {

    private readonly _loginUrl = 'http://109.73.84.88:8800/api/auth/login';
    private _isLogged = false;

    constructor(private _http: HttpClient) {

    }

    public login(body: LoginPayloadType): Observable<string> {
        return this._http.post<{ token: string }>(this._loginUrl, body).pipe(
            map(res => res.token),
            tap(_ => this._isLogged = true),
            catchError(_ => { throw new Error('Login Failed') }),
        );
    }

    public isLogged(): boolean {
        return this._isLogged;
    }
}