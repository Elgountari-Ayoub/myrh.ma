import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { JobOfferIndexComponent } from './components/jobOffers/job-offer-index/job-offer-index.component';
import { JobOfferCreateComponent } from './components/jobOffers/job-offer-create/job-offer-create.component';
import { RecruiterJobOffersComponent } from './components/dashboard/recruiter-job-offers/recruiter-job-offers.component';
import { RecruiterSubmissionsComponent } from './components/dashboard/recruiter-submissions/recruiter-submissions.component';
import { DashboardAgentComponent } from './components/dashboard-agent/dashboard-agent.component';
import { ValidationComponent } from './components/validation/validation.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RecruiterCreateComponent } from './components/recruiter/recruiter-create/recruiter-create.component';
import { UserComponent } from './components/user/user.component';
import { RecruiterStatisticsComponent } from './components/dashboard/recruiter-statistics/recruiter-statistics.component';
import { authGuard } from './auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TestComponent } from './components/test/test.component';
import { JobSeekerProfilesComponent } from './components/user/job-seeker-profiles/job-seeker-profiles.component';
import { SubmissionsComponent } from './components/user/submissions/submissions.component';

const routes: Routes = [
  {
    path: 'jobSeekerProfiles',
    component: JobSeekerProfilesComponent,
    canActivate: [authGuard],
  },
  { path: 'test', component: TestComponent, canActivate: [authGuard] },

  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'recruiter-job-offers', component: RecruiterJobOffersComponent },
      {
        path: 'recruiter-submissions',
        component: RecruiterSubmissionsComponent,
      },
      { path: 'recruiter-statistics', component: RecruiterStatisticsComponent },
      { path: '', redirectTo: 'recruiter-job-offers', pathMatch: 'full' }, // Default child route
    ],
    canActivate: [authGuard],
  },
  {
    path: 'agent-dash',
    component: DashboardAgentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user-dash',
    component: UserComponent,

    children: [
      { path: 'submissions', component: SubmissionsComponent },
      { path: 'jobSeekerProfiles', component: JobSeekerProfilesComponent },

      // { path: '', component: RecruiterStatisticsComponent },
      { path: '', redirectTo: 'submissions', pathMatch: 'full' }, // Default child route
    ],
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RecruiterCreateComponent,
    canActivate: [authGuard],
  },
  {
    path: 'validation',
    component: ValidationComponent,
    canActivate: [authGuard],
  },
  { path: 'jobOffer', component: JobOfferIndexComponent },
  {
    path: 'jobOffer-create',
    component: JobOfferCreateComponent,
    canActivate: [authGuard],
  },

  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
