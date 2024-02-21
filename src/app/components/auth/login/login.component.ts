import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { ClientDTO } from 'src/app/models/ClientDTO';
import { Auth } from 'src/app/models/Auth';
import { MyHttpService } from 'src/app/services/my-http.service';
import { JobSeekerService } from 'src/app/services/job-seeker.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.signInWithOauth();
  }

  signInForm: FormGroup;
  errorMessages: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private webSocketService: WebSocketService,
    private jobSeekerService: JobSeekerService,
    private http: MyHttpService
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: ['', [Validators.required, Validators.pattern(/\S+/)]],
    });
  }

  async signIn() {
    this.errorMessages = [];

    const signInFormValue = { ...this.signInForm.value };

    this.authService.signIn(signInFormValue).subscribe({
      next: (respone) => {
        if (respone.token) this.authService.setAuthToken(respone.token);
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
                  alert(jobSeeker.profiles?.length);
                  if (jobSeeker.profiles?.length == 0) {
                    this.router.navigate(['/test']);
                    return;
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
      },
      error: (error) => {
        console.log('ERROR: ', error);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error,
          footer: error,
        });
      },
    });
  }


  url : String = "";
  async signInWithOauth(){
  
    this.http.get("auth/url").subscribe((data : any)=> {
      console.log(data)
      this.url = data.url 
      console.log(this.url);
    });
  }
}
