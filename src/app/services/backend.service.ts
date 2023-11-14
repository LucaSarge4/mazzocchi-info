import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class BackendService {

    private base_url = 'http://109.73.84.88:8800/api';

    private _authToken!: string;

    constructor(private _http: HttpClient) {

    }

    public setAuthToken(token: string): void {
        this._authToken = token;
    }


    public getTableData(params: { page: number, size: number }): Observable<any> {
        const endpoint = `${this.base_url}/orders?page=${params.page}&size=${params.size}`
        return this._http.get(endpoint, {
            headers: {
                Authorization: `Bearer ${this._authToken}`
            }
        });
    }
}