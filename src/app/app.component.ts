import { Component, ViewChild } from '@angular/core';
import { IStudent } from './students.model';
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
    this.studentSvc.getStudents().subscribe(response => {
        this.studentsArr = response;     
        // this.dataSource.filterPredicate = function(data: IStudent, filter: string): boolean {
        //   return data.firstname.toLowerCase().includes(filter);// || data.symbol.toLowerCase().includes(filter) || data.position.toString().includes(filter);
        
     // };  
      
    })
  }

  public onLast(event): void{
    //this.CurrentPage = this.NumOfItems;
  }
}
  
  
 
