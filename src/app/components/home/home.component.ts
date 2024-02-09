import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from 'src/app/models/Auth';
import { Recruiter } from 'src/app/models/Recruiter';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MyHttpService } from 'src/app/services/my-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  authUser?: Auth | null;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private http: MyHttpService
  ) {}
  ngOnInit(): void {
    this.authUser = <Auth>this.authService.getAuthUser();
    this.getToken();
  }

  getToken() {
    this.route.queryParams.subscribe((params: any) => {

      if (params['code'] !== undefined) {
        debugger
        console.log(params['code']);
        // this.http.getToken(params['code']).subscribe((result: any) => {
        //   console.log(result);
        //   console.log('resulttttttttttttttttttt');
        //   alert(result);
        console.log(this.http.getToken(params['code']).subscribe((res : any)=>{
          console.log(res.data);
        }));
          this.authService.setAuthToken(this.http.getToken(params['code']).toString());
          // localStorage.setItem('token', result);
        // });
      }
    });
  }
}
