import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private baseUrl = 'http://localhost:8080/api/v1/recruiters';
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}
  getStatistics(id: number): Observable<any> {
    const requestOptions = {
      headers: this.authService.getHeaders(),
    };
    return this.http.get<any>(
      `${this.baseUrl}/statistics/${id}`,
      requestOptions
    );
  }

  getHeaders(): HttpHeaders {
    let token: string | null = '';
    if (this.authService.getAuthToken() != null) {
      token = this.authService.getAuthToken();
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return headers;
  }
}
