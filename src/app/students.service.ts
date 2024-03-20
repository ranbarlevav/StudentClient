import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { IStudent } from './models/students.model';
import { ApiResponse } from './models/apiresponse.model';

@Injectable({
  providedIn: 'root'
})


export class StudentsService {

  
  constructor(private http:HttpClient) { }

  // getStudents() : Observable<IStudent[]> {     
  //   return this.http.get<IStudent[]>(`/api/Student/GetStudents`);
  // }

  getStudents() : Observable<ApiResponse<IStudent[]>> {     
    return this.http.get<ApiResponse<IStudent[]>>(`/api/Student/GetStudents`)
  }


  // getFilteredStudents(filter: string) : Observable<IStudent[]> {
  //   return this.http.get<IStudent[]>(`/api/Student/GetStudents?filterByFirstName=${filter}`)

  // }
}
