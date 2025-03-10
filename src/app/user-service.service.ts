import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl = 'http://localhost:8080/users';
  constructor(private http:HttpClient) { }
  login(loginRequest: { userid: number; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginRequest);
  }

  register(user: { userid: Number; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
}
