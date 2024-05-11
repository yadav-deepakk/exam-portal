import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SignUpRequest } from "../models/signup-req";
import { LogInRequest } from "../models/login-req";
import { Observable } from "rxjs";
import { JwtResponse } from "../models/jwt-response";

const baseUrl: string = "http://localhost:8080/api/auth";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private http: HttpClient) {}

    signUpUser(signUpRequest: SignUpRequest): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(`${baseUrl}/signup`, signUpRequest);
    }

    logInUser(logInReqest: LogInRequest): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(`${baseUrl}/login`, logInReqest);
    }
}
