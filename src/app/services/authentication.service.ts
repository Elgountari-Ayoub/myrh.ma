import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../models/Auth';
import { JwtAuthenticationResponse } from '../models/JwtAuthenticationResponse';
import { Recruiter } from '../models/Recruiter';
import { SigninRequest } from '../models/SigninRequest';
import { SignUpRequest } from '../models/SignUpRequest';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private singUpUrl = 'http://localhost:8080/api/v1/auth/signup';
  private signInUrl = 'http://localhost:8080/api/v1/auth/signin';

  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    const token = this.getAuthToken();
    this.headers = this.headers.set('Authorization', `Bearer ${token ? token : ''}`);
    this.headers = this.headers.set('Content-Type', 'application/json');

  }
  signUp(signUpRequest: SignUpRequest): Observable<JwtAuthenticationResponse> {
    return this.http.post<JwtAuthenticationResponse>(
      `${this.singUpUrl}`,
      signUpRequest
    );
  }

  signIn(signInRequest: SigninRequest): Observable<JwtAuthenticationResponse> {
    return this.http.post<JwtAuthenticationResponse>(
      `${this.signInUrl}`,
      signInRequest
    );
  }

  getAuthUser(): Auth | null {
    const token = this.getAuthToken();

    if (!token) return null;

    const auth: any = jwtDecode(token);
    const authObj: Auth = {
      id: auth.id,
      name: auth.name,
      email: auth.sub,
      role: auth.role,
    };
    return authObj;
  }

  setAuthToken(token: string): void {
    window.localStorage.setItem('token', token);
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem('token');
  }

  clearAuthToken(): void {
    window.localStorage.removeItem('token');
  }

  setHeaders(key: string, value: string): void {
    this.headers.append(key, value);
  }

  getHeaders(): HttpHeaders {
    return this.headers;
  }
}
