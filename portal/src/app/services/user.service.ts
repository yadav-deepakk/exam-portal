import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  createUser(user: User) {
    return this.http.post(`${this.baseUrl}/user/create`, user);
  }
}
