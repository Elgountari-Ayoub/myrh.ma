import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recruiter } from '../models/Recruiter';
import { JwtAuthenticationResponse } from '../models/JwtAuthenticationResponse';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RecruiterService {
  private baseUrl = 'http://localhost:8080/api/v1/recruiters';
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  create(recruiter: Recruiter): Observable<JwtAuthenticationResponse> {
    const formData = new FormData();
    formData.append('id', `${recruiter.id}`);
    formData.append('email', recruiter.email!);
    formData.append('password', recruiter.password!);
    formData.append('login', recruiter.login!);
    formData.append('name', recruiter.name!);
    formData.append('phone', recruiter.phone!);
    formData.append('address', recruiter.address!);
    formData.append('image', recruiter.image!);
    formData.append('role', recruiter.role!);

    console.log(this.authService.getHeader('Authorization'));

    return this.http.post<JwtAuthenticationResponse>(`${this.baseUrl}`, formData,  {headers: this.authService.getHeader('Authorization')});
  }

  getById(id: number): Observable<Recruiter> {
    return this.http.get<Recruiter>(`${this.baseUrl}/${id}`);
  }

  validate(
    id: number | null,
    code?: string
  ): Observable<boolean> {

    const authorizationHeaderValue = this.authService.getHeaders().get('Authorization');
    const headers = new HttpHeaders({
      Authorization: authorizationHeaderValue !== null ? authorizationHeaderValue : '',
    });

    const url = `${this.baseUrl}/${id}/${code}/validation`;
    return this.http.post<boolean>(url, {}, {headers: this.authService.getHeader('Authorization')});
  }


}
