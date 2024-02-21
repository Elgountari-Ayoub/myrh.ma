import { Injectable } from '@angular/core';
import { JobSeeker_Profile } from '../models/JobSeeker_Profile';
import { Observable } from 'rxjs';
import { Profile } from '../models/Profile';
import { JobSeeker } from '../models/JobSeeker';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerService {
  private baseUrl = 'http://localhost:8080/api/v1/jobSeekers';
  private headers: HttpHeaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
        this.headers = this.authService.getHeaders();
  }

  addProfile(jobSeeker_Profile: JobSeeker_Profile): Observable<JobSeeker> {
    return this.http.post<JobSeeker>(
      `${this.baseUrl}/addProfile`,
      jobSeeker_Profile,
      { headers: this.headers }
    );
  }

  getById(id: number): Observable<JobSeeker> { 
    this.headers = this.authService.getHeaders();
    
    return this.http.get<JobSeeker>(`${this.baseUrl}/${id}`, { headers: this.headers }) 
  }
}
