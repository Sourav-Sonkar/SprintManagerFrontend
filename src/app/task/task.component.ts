import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../models/task';
import { TaskwithTeam } from '../models/taskwithTeam';
import { Team } from '../models/team';
import { UsersService } from '../service/auth/users.service';
import { TaskService } from '../service/task/task.service';
import { TeamService } from '../service/team/team.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  newTask: Task
  existingTask: Task
  taskwithTeam: TaskwithTeam
  updateTeam: Team
  errorAdding: boolean = false
  successAdding: boolean = false
  errorAssign: boolean = false
  successAssign: boolean = false
  errorUpdate: boolean = false
  successUpdate: boolean = false
  constructor(public empAuth: UsersService, public router: Router, public taskService: TaskService, public teamservice: TeamService) {
    if (!this.empAuth.isSignedIn) {
      router.navigateByUrl("/")
    }
    this.newTask = new Task()
    this.updateTeam = new Team();
    this.existingTask = new Task();
    this.taskwithTeam = new TaskwithTeam();
  }



  ngOnInit(): void {
    if (this.empAuth.isSignedIn) {
      this.getEmpTask()
    }
    this.getTask()
    this.teamservice.getTeam()
  }
  getEmpTask() {
    this.taskService.getSingleTask(this.empAuth.emp.teamid)
  }
  getTask() {
    this.taskService.getTask()
  }

  deleteTask(taskid: number, teamid: number) {
    this.taskwithTeam.taskid = taskid
    this.taskwithTeam.teamid = teamid
    console.log(this.taskwithTeam)
    this.taskService.deleteTask(this.taskwithTeam).subscribe(res => {
      if (res) {
        this.getTask()
        this.teamservice.getTeam()
      }
    })
  }


  addTask(addTaskForm: any) {
    this.errorAdding = false;
    this.successAdding = false
    this.newTask.taskstatus = this.taskService.taskStatusList[0];
    this.newTask.taskdate = new Date().getTime();
    this.taskService.addTask(this.newTask).subscribe(res => {
      if (res) {
        addTaskForm.form.markAsPristine()
        this.newTask = new Task()
        this.successAdding = true
        this.getTask()
      } else {
        this.errorAdding = true
      }
    })
  }
  assignTask(assignTaskForm: any) {
    this.errorAssign = false
    this.successAssign = false
    this.teamservice.assignTask(this.updateTeam).subscribe((res) => {
      if (res) {
        this.existingTask.taskid = this.updateTeam.taskid
        this.existingTask.taskstatus = this.taskService.taskStatusList[1];
        console.log(this.existingTask);
        this.taskService.updateStatus(this.existingTask).subscribe(res => {
          console.log(res)
        })
        this.successAssign = true;
        assignTaskForm.form.markAsPristine()
        this.teamservice.getTeam()
        this.getTask()
      }
      else {
        this.errorAssign = true
      }
    })
  }
  updateTaskStatusByEmp(updateTaskStatusForm: any) {
    this.errorUpdate = false;
    this.successUpdate = false;
    this.existingTask.taskid=this.taskService.empTask.taskid
    this.taskService.updateStatus(this.existingTask).subscribe(res => {
      if (res) {
        updateTaskStatusForm.form.markAsPristine()
        this.successUpdate = true
        this.getEmpTask()
      }
      else {
        this.errorUpdate = true
      }
    })
  }
  updateTaskStatus(updateTaskStatusForm: any) {
    this.errorUpdate = false;
    this.successUpdate = false;
    this.taskService.updateStatus(this.existingTask).subscribe(res => {
      if (res) {
        updateTaskStatusForm.form.markAsPristine()
        this.successUpdate = true
        this.getTask()
      }
      else {
        this.errorUpdate = true
      }
    })
  }
  dateformat(timestamp: any) {
    var date = new Date(parseInt(timestamp));
    var dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    return dateString
  }
}


