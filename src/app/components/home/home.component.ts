import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/models/Auth';
import { Recruiter } from 'src/app/models/Recruiter';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  authUser?: Auth | null;
  constructor(private authService: AuthenticationService){}
  ngOnInit(): void {
    this.authUser = <Auth> this.authService.getAuthUser();
    
  }
}
