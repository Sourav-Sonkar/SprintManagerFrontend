import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emp } from '../models/emp';
import { UsersService } from '../service/auth/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newEmp: Emp;
  error: boolean = false
  constructor(public empAuth: UsersService, public router: Router) {
    this.newEmp = new Emp();
  }

  ngOnInit(): void {
  }
  myimage: string = "assets/images/RR.jpg";

  signInSubmit(signInForm: any) {
    this.error = false;
    this.empAuth.signIn(this.newEmp).subscribe((res) => {
      if (res != null) {
        this.empAuth.isSignedIn = true;
        this.empAuth.checkManager(res.empid).subscribe((res1) => {
          this.empAuth.isManager = res1 ?? false
          this.empAuth.emp = res
          signInForm.reset();
          this.router.navigateByUrl("/home");
        })
      } else {
        this.error = !this.error
      }
    });
  }
}
