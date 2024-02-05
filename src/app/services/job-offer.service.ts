import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationModel } from '../models/PaginationModel';
import { JobOffer } from '../models/JobOffer';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root',
})
export class JobOfferService {
  private baseUrl = 'http://localhost:8080/api/v1/jobOffers';
  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.headers = this.authService.getHeaders();
  }

  getAllJobOffers(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${this.baseUrl}`, {
      headers: this.headers,
    });
  }

  getAllJobOffersByStatus(status: string): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${this.baseUrl}` + '/status=' + status, {
      headers: this.headers,
    });
  }

  getJobOfferById(id: number): Observable<JobOffer> {
    return this.http.get<JobOffer>(`${this.baseUrl}/${id}`, {
      headers: this.headers,
    });
  }

  getJobOffersByRecruiterId(id: number): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${this.baseUrl}/${id}`, {
      headers: this.headers,
    });
  }

  getJobOffersByUserId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/byUser/${id}`, {
      headers: this.headers,
    });
  }

  createJobOffer(
    jobOffer: JobOffer,
    recruiterId?: number
  ): Observable<JobOffer> {
    return this.http.post<JobOffer>(
      `${this.baseUrl}` + '/' + recruiterId,
      jobOffer,
      { headers: this.headers }
    );
  }

  updateJobOfferStatus(
    jobOfferId?: number,
    newStatus?: string
  ): Observable<string> {
    const url = `${this.baseUrl}/${jobOfferId}/${newStatus}`;
    const requestOptions = {
      headers: this.headers,
      responseType: 'text' as 'json',
    };

    return this.http.post<string>(url, {}, requestOptions);
  }
}
