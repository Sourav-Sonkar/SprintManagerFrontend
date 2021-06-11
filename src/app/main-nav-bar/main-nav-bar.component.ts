import { Component, OnInit } from '@angular/core';
import { Emp } from '../models/emp';
import { UsersService } from '../service/auth/users.service';


@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css']
})
export class MainNavBarComponent implements OnInit {
  logo: string = "assets/images/RR_removebg.png";
  isSignedIn: boolean = false
  constructor(public empAuth: UsersService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.empAuth.isSignedIn = false;
    this.empAuth.isManager = false;
    this.empAuth.emp = new Emp();
  }
}
