import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthComponent } from './auth/auth.component';
import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { TeamComponent } from './team/team.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomepageComponent },
  {path: 'dashboard', component:DashboardComponent},
  {path: 'task', component:TaskComponent},
  {path: 'team', component:TeamComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    AuthComponent,
    TaskComponent,
    MainNavBarComponent,
    DashboardComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
