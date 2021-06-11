import { Component, OnInit } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { Emp } from '../models/emp';
import { UsersService } from '../service/auth/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  newEmp: Emp
  error: boolean = false
  constructor(public empAuth: UsersService, public authComponent: AuthComponent) {
    this.newEmp = new Emp();
  }

  ngOnInit(): void {
  }

  signUpSubmit(signUpForm: any) {
    this.error = false;
    this.empAuth.signUp(this.newEmp).subscribe((res) => {
      if (res) {
        this.empAuth.changeForm();
        signUpForm.reset()
      }
      else {
        this.error = !this.error
      }
    })
  }
}
