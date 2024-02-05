import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { JwtAuthenticationResponse } from '../models/JwtAuthenticationResponse';

@Injectable({
  providedIn: 'root',
})
export class MyHttpService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  request(method: string, url: string, data: any): Observable<any> | null {
    const headers = this.authService.getHeaders();
    switch (method) {
      case 'GET':
        {
          return this.http.get(
            `${url}`,
            {headers}
          );
        }
        break;
      case 'POST':
        {
          return this.http.post(
            `${url}`,
            data, 
            {headers}
          );
        }
        break;

      default:
        break;
    }
    return null;
  }
}
