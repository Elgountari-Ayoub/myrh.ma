import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/Auth';
import { ClientDTO } from 'src/app/models/ClientDTO';
import { Recruiter } from 'src/app/models/Recruiter';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService, private webSocketService: WebSocketService) { }
  logout() {
    this.webSocketService.disconnect();
  }
  authUser?: Auth | null;
  ngOnInit(): void {
    this.authUser = <Auth>this.authService.getAuthUser();
  }
}
