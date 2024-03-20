import { Component, ViewChild } from '@angular/core';
import { IStudent } from './models/students.model';
import { MatTableDataSource } from '@angular/material/table';
import { StudentsService } from './students.service';
import { MatPaginator , MatPaginatorIntl} from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
       
  public studentsArr : IStudent[] = []  

  displayedColumns: string[] = ['idnumber', 'firstname', 'lastname'];

  constructor(private studentSvc: StudentsService){  
  
  }


  ngOnInit(){    

    this.studentSvc.getStudents().subscribe({
      next: value => {
        if(value.success)
          this.studentsArr = value.data;
        else
         console.error('getStudents emitted an error: ' + value.errormessage)
      },
      error: err => console.error('getStudents emitted an error: ' + err),
      complete: () => console.log('getStudents service end')
    });

  }

  public onLast(event): void{
    //this.CurrentPage = this.NumOfItems;
  }
}
  
  
 
