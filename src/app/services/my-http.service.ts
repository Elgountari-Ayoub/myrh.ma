import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { JwtAuthenticationResponse } from '../models/JwtAuthenticationResponse';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MyHttpService {
  // constructor(
  //   private http: HttpClient,
  //   private authService: AuthenticationService
  // ) {}

  // request(method: string, url: string, data: any): Observable<any> | null {
  //   const headers = this.authService.getHeaders();
  //   switch (method) {
  //     case 'GET':
  //       {
  //         return this.http.get(
  //           `${url}`,
  //           {headers}
  //         );
  //       }
  //       break;
  //     case 'POST':
  //       {
  //         return this.http.post(
  //           `${url}`,
  //           data, 
  //           {headers}
  //         );
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  //   return null;
  // }

  private baseUrl = 'http://localhost:8080';
  token: string = "";
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  get(url: string) {
    return this.http.get("http://localhost:8080/" + url);
  }

  getPrivate(url: string) {
    console.log(this.token)
    return this.http.get("http://localhost:8080/" + url,
      { headers: new HttpHeaders({ "Authorization": "Baerer " + this.token }) });
  }


  getToken(code: string): Observable<string> {
    const url = `${this.baseUrl}/auth/callback?code=${code}`;
    const requestOptions = {
      responseType: 'text' as 'json',
    };
    return this.http.get<string>(url, requestOptions);
  }
  getUserInfo(token: string) {
    return this.http.get("http://localhost:8080/auth/userInfo?id_token=" + token).subscribe(res => {
      console.log(res);
    })
  }
}
