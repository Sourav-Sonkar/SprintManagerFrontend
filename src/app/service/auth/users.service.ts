import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Emp } from 'src/app/models/emp';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isSignedIn: boolean = false
  emp: Emp
  empList: Emp[] = []
  isManager: boolean = false
  isSignUp: boolean = false;
  isSignIn: boolean = true;
  constructor(public http: HttpClient) {
    this.emp = new Emp()
  }

  signUp(newUser: Emp) {
    return this.http.post('http://localhost:8080/signup', newUser)
  }

  signIn(newUser: Emp) {
    return this.http.post<Emp>('http://localhost:8080/signin', newUser)
  }

  checkManager(empId: string) {
    return this.http.post<boolean>('http://localhost:8080/isManager', {
      "empid": empId
    })
  }
  getemployeeList() {
    this.http.get<Emp[]>('http://localhost:8080/employee/view').subscribe(res => {
      this.empList = res
    })
  }
  updateTeam(emp: Emp) {
    return this.http.put<boolean>('http://localhost:8080/employee/updateTeam',emp)
  }
  changeForm() {
    this.isSignIn = !this.isSignIn;
    this.isSignUp = !this.isSignUp;
  }
}
