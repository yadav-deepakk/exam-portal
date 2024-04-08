import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  createUser(user: any) {
    return this.http.post(`${this.baseUrl}/user/create`, user);
  }
}
