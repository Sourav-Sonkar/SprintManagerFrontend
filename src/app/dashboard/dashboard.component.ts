import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from '../models/team';
import { UsersService } from '../service/auth/users.service';
import { TaskService } from '../service/task/task.service';
import { TeamService } from '../service/team/team.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  task: string = "assets/images/task.png";
  team: string = "assets/images/team.jpg";
  employee: string = "assets/images/employee.jpg";
  teamCount: number = 0
  empCount: number = 0
  taskCount: number = 0
  assigned: number = 0
  unassigned: number = 0
  closedTask: number = 0
  newTask: number = 0
  teamdata: Team
  empWithOutTeam: number = 0

  constructor(public empAuth: UsersService, public router: Router, public taskservice: TaskService, public teamservice: TeamService) {
    if (!this.empAuth.isSignedIn) {
      router.navigateByUrl("/")
    }
    this.teamdata = new Team()
    this.empAuth.getemployeeList()

    if (this.empAuth.isManager) {
      this.teamservice.getTeam()
      this.taskservice.getTask()
    }
    if (!this.empAuth.isManager) {
      this.taskservice.getSingleTask(this.empAuth.emp.teamid)
      this.teamdata.teamid = this.empAuth.emp.teamid
      this.teamservice.getsingleTeam(this.teamdata).subscribe(res => {
        if (res)
          this.teamdata = res
      })
    }
  }

  ngOnInit(): void {
    if (this.empAuth.isManager) {
      this.loadTeamStats()
      this.loadTaskStats()
      this.loadEmployeeStats()
    }
    if (!this.empAuth.isManager)
      this.loadSingleTeamEmp()
  }

  loadSingleTeamEmp() {
    this.empCount = 0
    this.empAuth.empList.forEach(singleEmp => {
      if (singleEmp.teamid != null && singleEmp.teamid == this.empAuth.emp.teamid)
        this.empCount++
    })
  }

  loadTeamStats() {
    this.teamCount = this.teamservice.team.length
    this.teamservice.team.forEach(singleTeam => {
      if (singleTeam.taskid != null)
        this.assigned++
      else
        this.unassigned++
    })
  }
  loadEmployeeStats() {
    this.empCount = this.empAuth.empList.length
    this.empAuth.empList.forEach(singleEmp => {
      if (singleEmp.teamid == null)
        this.empWithOutTeam++
    })
  }
  loadTaskStats() {
    this.taskCount = this.taskservice.task.length
    this.taskservice.task.forEach(singleTask => {
      if (singleTask.taskstatus == this.taskservice.taskStatusList[0])
        this.newTask++
      else if (singleTask.taskstatus == this.taskservice.taskStatusList[4])
        this.closedTask++
    })
  }
}
