import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/includes/footer/footer.component';
import { NavbarComponent } from './components/includes/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobOfferIndexComponent } from './components/jobOffers/job-offer-index/job-offer-index.component';
import { JobOfferCreateComponent } from './components/jobOffers/job-offer-create/job-offer-create.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardAgentComponent } from './components/dashboard-agent/dashboard-agent.component';
import { DashNavbarComponent } from './components/includes/dash-navbar/dash-navbar.component';
import { RecruiterJobOffersComponent } from './components/dashboard/recruiter-job-offers/recruiter-job-offers.component';
import { RecruiterSubmissionsComponent } from './components/dashboard/recruiter-submissions/recruiter-submissions.component';
import { ValidationComponent } from './components/validation/validation.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { RecruiterCreateComponent } from './components/recruiter/recruiter-create/recruiter-create.component';
import { UserComponent } from './components/user/user.component';
import { RecruiterStatisticsComponent } from './components/dashboard/recruiter-statistics/recruiter-statistics.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { QuestionComponent } from './components/question/question.component';
import { TestComponent } from './components/test/test.component';
import { CongratulationsComponent } from './components/congratulations/congratulations.component';
import { TryLaterComponent } from './components/try-later/try-later.component';
import { MyProfilesComponent } from './components/my-profiles/my-profiles.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    DashboardComponent,
    JobOfferIndexComponent,
    JobOfferCreateComponent,
    LoginComponent,
    DashboardAgentComponent,
    DashNavbarComponent,
    RecruiterJobOffersComponent,
    RecruiterSubmissionsComponent,
    ValidationComponent,
    SignupComponent,
    RecruiterCreateComponent,
    UserComponent,
    RecruiterStatisticsComponent,
    NotFoundComponent,
    QuestionComponent,
    TestComponent,
    CongratulationsComponent,
    TryLaterComponent,
    MyProfilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
