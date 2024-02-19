import { Component, OnInit } from '@angular/core';
import { JobSeeker_Profile } from 'src/app/models/JobSeeker_Profile';
import { Profile } from 'src/app/models/Profile';
import { Question } from 'src/app/models/Question';
import { JobSeekerProfileService } from 'src/app/services/job-seeker-profile.service';
import { JobSeekerService } from 'src/app/services/job-seeker.service';
import { ProfileService } from 'src/app/services/profile.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  questions: Question[] = [];
  profiles: Profile[] = [];
  currentIndex: number = 0;

  constructor(
    private questionService: QuestionService,
    private profileService: ProfileService,
    private jobSeekerService: JobSeekerService
  ) {}

  ngOnInit(): void {
    this.getProfiles();
    // const jobSeeker_Profile: JobSeeker_Profile = {
    //   jobSeeker: {id: 2},
    //   profile: {id: 1}
    // };
    // debugger
    // this.jobSeekerService.addProfile(jobSeeker_Profile).subscribe((data) => {
    //   console.log('Created a new profile', data);
    // });
  }

  getProfiles(): void {
    console.log("this.profiles");

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
  getQuestions(): void {
    this.questionService
      .getQuestions()
      .subscribe((questions) => (this.questions = questions));
  }

  nextQuestion(): void {
    this.currentIndex++;
  }
}
