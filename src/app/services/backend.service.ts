import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreatePayload } from "../create-user/create-user.component";
import { UserType } from "../models/user.type";
import { SortingType } from "../table/table.component";

@Injectable()
export class BackendService {

    private base_url = 'https://webapp.mazzocchinet.com/api';

    private _authToken!: string;

    constructor(private _http: HttpClient) {

    }

    public setAuthToken(token: string): void {
        this._authToken = token;
    }


    public getTableData(params: { page: number, size: number }, sorting?: SortingType): Observable<any> {
        const endpoint = `${this.base_url}/orders?page=${params.page}&size=${params.size}${sorting ? `&sorting_dir=${sorting.sortingDir}&sorting_field=${sorting.sortingField}` : ''}`;
        return this._http.get(endpoint, {
            headers: {
                Authorization: `Bearer ${this._authToken}`
            }
        });
    }

    public createUser(payload: CreatePayload) {
        return this._http.post(`${this.base_url}/auth/register`, payload, {
            headers: {
                Authorization: `Bearer ${this._authToken}`
            }
        });
    }

    public getUser(): Observable<{ data: { user: UserType } }> {
        return this._http.get<{ data: { user: UserType } }>(`${this.base_url}/users/me`, {
            headers: {
                Authorization: `Bearer ${this._authToken}`
            }
        });
    }
}