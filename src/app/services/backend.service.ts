import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class BackendService {

    private base_url = 'https://webapp.mazzocchinet.com/api';

    private _authToken!: string;

    constructor(private _http: HttpClient) {

    }

    public setAuthToken(token: string): void {
        this._authToken = token;
    }


    public getTableData(): Observable<any> {
        return this._http.get(`${this.base_url}/status`);
    }
}