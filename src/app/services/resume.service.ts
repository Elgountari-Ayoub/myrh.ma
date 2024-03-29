import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { JobOffer } from '../models/JobOffer';
import { Resume } from '../models/Resume';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private baseUrl = 'http://localhost:8080/api/v1/resumes';

  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.headers = this.authService.getHeaders();
  }

  create(formData: FormData, id: number): Observable<Resume> {
    return this.http.post<Resume>(`${this.baseUrl}/${id}`, formData);
  }
  updateStatus(newStatus: string, id: number): Observable<Resume> {
    return this.http.post<Resume>(`${this.baseUrl}/${id}/${newStatus}`, {});
  }

  getAllResumeByJobOffer(recruiterId: number): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.baseUrl}` + "/byRecruiter/" + recruiterId);
  }
  getAllResumeByUser(userId: number): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.baseUrl}/byUser/${userId}`)
  }
}
