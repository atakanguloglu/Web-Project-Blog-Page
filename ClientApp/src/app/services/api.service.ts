import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:5169/api/user/';
  token = localStorage.getItem('token'); // Retrieve the JWT token
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.baseUrl, {
      headers: this.headers,
    });
  }
}
