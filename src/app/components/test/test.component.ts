import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobSeeker_Profile } from 'src/app/models/JobSeeker_Profile';
import { Profile } from 'src/app/models/Profile';
import { Question } from 'src/app/models/Question';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JobSeekerProfileService } from 'src/app/services/job-seeker-profile.service';
import { JobSeekerService } from 'src/app/services/job-seeker.service';
import { ProfileService } from 'src/app/services/profile.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  // questions: Question[] = [];
  profiles: Profile[] = [];
  selectedProfile!: Profile;
  currentIndex: number = 0;
  jobSeekerAnswer: boolean | null = null;
  total: number = 0;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private profileService: ProfileService,
    private jobSeekerService: JobSeekerService
  ) { }

  ngOnInit(): void {
    this.getProfiles();

  }
  loadSelectedProfileQuestion(event: any): void {
    const profileId: number = event.target.value;
    console.log(typeof (profileId));

    if (profileId !== undefined && profileId !== -1) {
      this.getProfileById(profileId);
    }
  }


  getProfileById(profileId: number): void {
    this.profileService.getById(profileId).subscribe({
      next: (profile) => {
        this.selectedProfile = profile;
        console.log(this.selectedProfile);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getProfiles(): void {
    this.profileService.getAll().subscribe({
      next: (profiles) => {
        this.profiles = profiles;
        console.log(this.profiles);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  // getQuestions(): void {
  //   this.questionService
  //     .getQuestions()
  //     .subscribe((questions) => (this.questions = questions));
  // }

  nextQuestion(): void {
    if (this.selectedProfile && this.selectedProfile.questions && this.currentIndex < (this.selectedProfile.questions?.length ?? 0)) {
      let question: Question = this.selectedProfile.questions[this.currentIndex];

      if (question.answer == this.jobSeekerAnswer) this.total++
    }
    this.jobSeekerAnswer = null;

    console.log(this.currentIndex);

    if (this.currentIndex == 9) {
      if (this.total == 10) {
        Swal.fire({
          icon: 'success',
          title: 'congratulations your new profile🎉🎊',
          text: "More profiles, more chances to land a job, keep going",
        });

        const jobSeeker_Profile: JobSeeker_Profile = {
          jobSeeker: { id: this.authService.getAuthUser()?.id ?? 0 },
          profile: { id: this.selectedProfile.id }
        };
        this.jobSeekerService.addProfile(jobSeeker_Profile).subscribe((data) => {

        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Try later',
          text: "There is no failure, just learning",
        });
      }
      this.router.navigate(['/']);
    }
    this.currentIndex++;
  }
}
