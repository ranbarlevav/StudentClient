import { Component, Input, OnInit, SimpleChange, input } from '@angular/core';
import { IStudent } from '../../students.model';

@Component({
  selector: 'stg-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent  implements OnInit {
 
  @Input() StudensList: IStudent[];
  
  CurrentPage : number = 1;
  ItemsPerPage: number = 10;
  SortDirection: string = ''
  FilteredStudensList: IStudent[];  
  UnFilteredStudensList: IStudent[] = [];
  filterString : string = "";


  ngOnInit(): void {
    //this.onFilterChange();   
  }
  
  FromIndex(): number{
    console.log((this.CurrentPage - 1)  * this.ItemsPerPage);
    return (this.CurrentPage - 1)  * this.ItemsPerPage;
  }

  ToIndex(): number{
    console.log(this.FromIndex() + this.ItemsPerPage);
    return this.FromIndex() + this.ItemsPerPage ;
  }

  LastIndex(): number{
    return this.FromIndex() + this.ItemsPerPage ;
  }

  get NumOfPages(): number{
    return Math.ceil(this.StudensList.length /  this.ItemsPerPage);
  }
  
  OnCurrentPageChange(page){
    this.CurrentPage = page;
    console.log("table:" +  page);
  }

  ngOnChanges(changes: SimpleChange) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);     
     console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);     
    }
  }

  OnSortClick(propName: any){

    if(propName === propName){    
      if(this.SortDirection.includes(propName)){
        //this.StudensList.sort((a,b) => b.firstname.localeCompare(a.firstname));   
        this.StudensList.sort((a,b) => this.getValue(b,propName).localeCompare(this.getValue(a,propName)));
        this.SortDirection = "";
      }
      else 
      {
        this.StudensList.sort((a,b) => this.getValue(a,propName).localeCompare(this.getValue(b,propName)));
        this.SortDirection = propName;
      }              
    }                    
  }                                              
   getValue<IStudent, K extends keyof IStudent>(data: IStudent, key: K) {
    return data[key];
  }

  onFilterChange() {
    if(this.UnFilteredStudensList.length === 0){
      this.UnFilteredStudensList = this.StudensList;
    }  
    this.StudensList = this.UnFilteredStudensList; 
    if(this.filterString === ''){
      this.StudensList = this.UnFilteredStudensList;
    }
    else {
      this.StudensList = this.UnFilteredStudensList;
      this.StudensList = this.StudensList.filter((student) => this.isMatch(student));  
    }
    this.CurrentPage = 1;
    
  }

  isMatch(item: IStudent) {    
      return item.firstname.indexOf(this.filterString) > -1
  }
  
  
}
  

