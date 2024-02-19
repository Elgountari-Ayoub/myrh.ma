import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Profile } from '../models/Profile';
import { JobSeeker_Profile } from '../models/JobSeeker_Profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'http://localhost:8080/api/v1/profiles';
    private headers: HttpHeaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.headers = this.authService.getHeaders();
  }

  getAll(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.baseUrl}`, { headers: this.headers }) 
  }
}
