import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerProfilesComponent } from './job-seeker-profiles.component';

describe('JobSeekerProfilesComponent', () => {
  let component: JobSeekerProfilesComponent;
  let fixture: ComponentFixture<JobSeekerProfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobSeekerProfilesComponent]
    });
    fixture = TestBed.createComponent(JobSeekerProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
