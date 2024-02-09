import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import { Auth } from 'src/app/models/Auth';
import { ClientDTO } from 'src/app/models/ClientDTO';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { MyHttpService } from 'src/app/services/my-http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit{
  url : String = "" 

  ngOnInit(): void {
    this.signInWithOauth();
    this.getToken();

    }

  signUpForm: FormGroup;
  errorMessages: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private webSocketService: WebSocketService,
    private router: Router,
    private route: ActivatedRoute,
    private http: MyHttpService
  ) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/\S+/)]],
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: ['', [Validators.required, Validators.pattern(/\S+/)]],
      role: ['USER'],
    });
  }

  signUp() {
    const signUpFormValue = { ...this.signUpForm.value };
    this.authService.signUp(signUpFormValue).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.setAuthToken(response.token);
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
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: error,
        });
        console.log(error.error);
      },
    });
  }

  async signInWithOauth(){
  
    this.http.get("auth/url").subscribe((data : any)=> {
      console.log(data)
      this.url = data.url 
      console.log(this.url);
    });
  }

  getToken() {
    this.route.queryParams.subscribe((params: any)  => {
      console.log(this.route);
      console.log(params["code"]);
      
      if(params["code"] !== undefined){

        console.log(params["code"]);
            this.http.getToken(params["code"]).subscribe((result : any) => {
              console.log(result);
              console.log("resulttttttttttttttttttt");
              this.authService.setAuthToken(result);
              // localStorage.setItem('token', result);
            })
      }
    })
  }
}
