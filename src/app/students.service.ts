import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudent } from './students.model';
@Injectable({
  providedIn: 'root'
})


export class StudentsService {

  
  constructor(private http:HttpClient) { }

  getStudents() : Observable<IStudent[]> {
    return this.http.get<IStudent[]>(`/api/Student/GetStudents`)

  }

  // getFilteredStudents(filter: string) : Observable<IStudent[]> {
  //   return this.http.get<IStudent[]>(`/api/Student/GetStudents?filterByFirstName=${filter}`)

  // }
}
