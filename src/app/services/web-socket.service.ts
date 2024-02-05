import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { Observable, throwError } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from '../app.component';
import { Auth } from '../models/Auth';
import { AuthenticationService } from './authentication.service';
import { ClientDTO } from '../models/ClientDTO';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  async connect(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.stompClient && this.stompClient.connected) {
        console.log('WebSocket connection is already open.');
        resolve();
      } else {
        const socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(socket);

        const requestOptions = {
          headers: this.authService.getHeaders(),
        };

        this.stompClient.connect(requestOptions, () => {
          console.log('WebSocket Connected');
          resolve();
        });
      }
    });
  }

  addUser(clientDTO: ClientDTO): Observable<any> {
    return new Observable((observer) => {
      if (this.stompClient && this.stompClient.connected) {
        const requestOptions = {
          headers: this.authService.getHeaders(),
        };
        this.stompClient.send(
          '/app/user.addUser',
          requestOptions,
          JSON.stringify(clientDTO)
        );
        observer.next();
        observer.complete();
      } else {
        console.error('WebSocket connection is not open.');
      }
    });
  }

  disconnect(): void {
    this.connect().then(() => {
      const requestOptions = {
        headers: this.authService.getHeaders(),
      };

      const authUser = <Auth>this.authService.getAuthUser();
      const clientDTO: ClientDTO = {
        clientId: authUser.id,
      };
      this.stompClient.send(
        '/app/user.disconnectUser',
        requestOptions,
        JSON.stringify(clientDTO)
      );
      this.stompClient.disconnect();
      console.log('WebSocket Disconnected');

      this.authService.clearAuthToken();
      localStorage.removeItem('recruiter');
      this.router.navigate(['/login']);
    });
  }
}
