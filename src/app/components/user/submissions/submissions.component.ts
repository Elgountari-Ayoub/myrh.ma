import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/Auth';
import { JobOffer } from 'src/app/models/JobOffer';
import { Resume } from 'src/app/models/Resume';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { ResumeService } from 'src/app/services/resume.service';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit{
  jobOffers: JobOffer[] = [];
  resumes: Resume[] = [];
  auth?: Auth | null;

  errorMessages: string[] = [];

  constructor(
    private resumeService: ResumeService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.auth = <Auth>this.authService.getAuthUser();
    this.loadJobOffers();
  }

  loadJobOffers(): void {
    if (this.auth?.id) {

      this.resumeService.getAllResumeByUser(this.auth?.id).subscribe(
        (data) => {
          this.resumes = data;
          console.log(data);
          
        },
        (error) => {
          console.error('Error load:', error);
        }
      );
    }
  }
}