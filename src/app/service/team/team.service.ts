import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from 'src/app/models/team';

@Injectable({
  providedIn: 'root'
})


export class TeamService {
  
  team: Team[]= [];

  constructor(public http: HttpClient) { }

  getTeam() {
    this.http.get<Team[]>('http://localhost:8080/team/view').subscribe(res => {
      this.team = res
    })
  }

  deleteTeam(teamId:String){
    return this.http.delete<boolean>('http://localhost:8080/team/delete/' + teamId)
  }

   
  addTeam(newTeam: Team){
    return this.http.post<Team>('http://localhost:8080/team/add',newTeam)
  }

  getsingleTeam(newTeam: Team){
    return this.http.post<Team>('http://localhost:8080/team/getName',newTeam)
  }

  assignTask(newTeam: Team){
    return this.http.put<Team>('http://localhost:8080/team/assignTask',newTeam)
  } 
}

