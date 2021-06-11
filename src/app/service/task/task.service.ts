import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskwithTeam } from 'src/app/models/taskwithTeam';
import { Team } from 'src/app/models/team';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  task: TaskwithTeam[] = [];
  taskStatusList: string[] = ["New", "In-Progress", "Fixed", "Under Review", "Closed"]
  empTask: Task


  constructor(public http: HttpClient) {
    this.empTask = new Task();
  }

  getTask() {
    this.http.get<TaskwithTeam[]>('http://localhost:8080/task/view').subscribe(res => {
      if (res)
        this.task = res
    })
  }

  deleteTask(task: TaskwithTeam) {
    return this.http.post<boolean>('http://localhost:8080/task/delete/', task)
  }


  addTask(newTask: Task) {
    return this.http.post<boolean>('http://localhost:8080/task/add', newTask)
  }
  updateStatus(newTask: Task) {
    return this.http.put<boolean>('http://localhost:8080/task/updateStatus', newTask)
  }
  getSingleTask(teamid: any) {

    this.http.post<Task>('http://localhost:8080/task/singleTask/', {
      "teamid": teamid
    }).subscribe(res => {
      if (res)
        this.empTask = res
    }
    )
  }

}
