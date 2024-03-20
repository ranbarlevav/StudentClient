import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map, throwError } from 'rxjs';
import { IStudent } from './models/students.model';
import { ApiResponse } from './models/apiresponse.model';

@Injectable({
  providedIn: 'root'
})


export class StudentsService {

  
  constructor(private http:HttpClient) { }
  
  getStudents() : Observable<ApiResponse<IStudent[]>> {       
    return this.http.get<ApiResponse<IStudent[]>>(`/api/Student/GetStudents`);
  }
}
