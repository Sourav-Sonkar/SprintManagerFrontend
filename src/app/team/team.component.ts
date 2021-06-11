import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emp } from '../models/emp';
import { Task } from '../models/task';
import { Team } from '../models/team';
import { UsersService } from '../service/auth/users.service';
import { TaskService } from '../service/task/task.service';
import { TeamService } from '../service/team/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit {

  currentTeam: Team
  newTeam: Team
  updateEmp: Emp
  errorFlag: boolean = false
  vflag: boolean = false
  addTeamError: boolean = false
  addTeamSuccess: boolean = false
  updateEmpSuccess: boolean = false
  updateEmpError: boolean = false

  constructor(public empAuth: UsersService, public router: Router, public teamService: TeamService) {
    if (!this.empAuth.isSignedIn) {
      router.navigateByUrl("/")
    }
    this.currentTeam = new Team()
    this.newTeam = new Team()
    this.updateEmp = new Emp()
  }


  ngOnInit(): void {
    if (this.empAuth.isManager)
      this.getTeam()
    else
      this.getSingleTeam()
    this.getEmployeeList();

  }

  getEmployeeList() {
    this.empAuth.getemployeeList()
  }
  getTeam() {
    this.teamService.getTeam()
  }

  getSingleTeam() {
    this.currentTeam.teamid = this.empAuth.emp.teamid;
    this.teamService.getsingleTeam(this.currentTeam).subscribe(res => {
      if (res) {
        this.currentTeam = res
      }
    });
  }
  deleteTeam(teamid: String, index: number) {
    this.teamService.deleteTeam(teamid).subscribe(res => {
      if (res)
        this.teamService.team.splice(index, 1)
    })
  }
  addEmp(addEmployee: any) {
    this.updateEmpSuccess = false;
    this.updateEmpError = false;
    this.empAuth.updateTeam(this.updateEmp).subscribe(res => {
      if (res) {
        this.updateEmpSuccess = true;
        this.getEmployeeList();
        addEmployee.form.markAsPristine()
      }
      else {
        this.updateEmpError = true;
      }
    })
  }

  addTeam(addTeamForm: any) {
    this.addTeamError = false;
    this.addTeamSuccess = false;
    this.teamService.addTeam(this.newTeam).subscribe(res => {
      if (res) {
        addTeamForm.form.markAsPristine()
        this.newTeam = new Team()
        this.getTeam()
        this.addTeamSuccess = true;
      }
      else
        this.addTeamError = true
    })
  }
}


