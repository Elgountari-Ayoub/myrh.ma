import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobSeeker } from 'src/app/models/JobSeeker';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JobSeekerService } from 'src/app/services/job-seeker.service';
import { MyHttpService } from 'src/app/services/my-http.service';

@Component({
  selector: 'app-job-seeker-profiles',
  templateUrl: './job-seeker-profiles.component.html',
  styleUrls: ['./job-seeker-profiles.component.css'],
})
export class JobSeekerProfilesComponent implements OnInit {
  public jobSeeker: JobSeeker | null = null;
  ngOnInit(): void {
    this.getJobSeeker();
    console.log(this.jobSeeker);

  }

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private jobSeekerService: JobSeekerService,
  ) {}

  getJobSeeker(): JobSeeker | null{
    this.jobSeekerService.getById(this.authService.getAuthUser()?.id ?? 0).subscribe({
      next: (jobSeeker) => {
        this.jobSeeker = jobSeeker;
        return jobSeeker;
      },
      error: (error) => {
        return null;
      }
    })
    return null;
  }
}
