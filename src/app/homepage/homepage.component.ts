import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../service/auth/users.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public empAuth: UsersService) {
    
  }
    

  ngOnInit(): void {
  }
  myimage:string="assets/images/Jira.jpg.webp";
  workflow:string="assets/images/workflow.PNG";

}
