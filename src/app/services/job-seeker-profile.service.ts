import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { JobSeeker_Profile } from '../models/JobSeeker_Profile';
import { Observable } from 'rxjs';
import { Profile } from '../models/Profile';

@Injectable({
  providedIn: 'root',
})
export class JobSeekerProfileService {
  private baseUrl = 'http://localhost:8080/api/v1/---';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
  }

}
