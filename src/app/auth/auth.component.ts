import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../service/auth/users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  logoBg: string = "assets/images/RR.jpg";
  // logo: string = "assets/images/RR_removebg.png";
  logo: string = "assets/images/loginpic.jpg";
  isSignUp: boolean = false;
  isSignIn: boolean = true;

  constructor(public empAuth: UsersService, public router: Router) {
    if (this.empAuth.isSignedIn)
      router.navigateByUrl("/home")
  }

  ngOnInit(): void {
  }
 
}
