import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/models/Auth';
import { ClientDTO } from 'src/app/models/ClientDTO';
import { Recruiter } from 'src/app/models/Recruiter';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MyHttpService } from 'src/app/services/my-http.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import Swal from 'sweetalert2';

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
    private router: Router,
    private http: MyHttpService,
    private webSocketService: WebSocketService
  ) { }
  ngOnInit(): void {
    this.authUser = <Auth>this.authService.getAuthUser();
    this.getToken();
  }

  getToken() {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params['code'] == undefined);

      if (params['code'] !== undefined) {
        this.http.getToken(params['code'])
          .subscribe(token => {
            if (token) {
              this.authService.setAuthToken(token);
              this.webSocketService.connect().then(() => {
                const auth = this.authService.getAuthUser();
                const clientDTO: ClientDTO = {
                  clientId: auth?.id,
                };
                this.webSocketService.addUser(clientDTO).subscribe(
                  () => {
                    console.log('User added successfully');
                  },
                  (error) => {
                    console.error('Error adding user:', error);
                  }
                );
              });
              this.router.navigate(['/']);
            }
          }, error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: error,
            });
            console.log(error.error);
          });
      }
    });
  }
}
