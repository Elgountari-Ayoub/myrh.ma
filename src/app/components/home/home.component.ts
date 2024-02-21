import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/models/Auth';
import { ClientDTO } from 'src/app/models/ClientDTO';
import { Recruiter } from 'src/app/models/Recruiter';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JobSeekerService } from 'src/app/services/job-seeker.service';
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
    private webSocketService: WebSocketService,
    private jobSeekerService: JobSeekerService,

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
                // return;
                switch (auth?.role) {
                  case 'AGENT':
                    this.router.navigate(['/agent-dash']);
                    break;
                  case 'RECRUITER':
                    this.router.navigate(['/dashboard']);
                    break;
                  case 'JOBSEEKER':
                    this.jobSeekerService.getById(this.authService.getAuthUser()?.id ?? 0).subscribe({
                      next: (jobSeeker) => {
                        alert("hiii ya abdellah")
                        console.log(jobSeeker);
                        if (jobSeeker.profiles?.length == 0) {
                          this.router.navigate(['/test']);
                        }
                        this.router.navigate(['/user-dash']);
                      },
                      error: (error) => {
                        console.log("error ------- ", error);

                      }
                    })
                    break;
                  default: // Guest
                    this.router.navigate(['/']);
                }
              });
              // this.router.navigate(['/']);
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
