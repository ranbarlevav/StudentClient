import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component,EventEmitter,Input, OnInit, Output,SimpleChanges } from '@angular/core';

@Component({
  selector: 'stg-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent{

  fromRange : number = 1; 
  toRange : number = 5; 
  maxPagesInRange : number = 5 
  PageNumbersRange : number[] = [1,2,3,4,5];

  @Input() GetCurrentPage: number;
  @Output() GetCurrentPageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() NumOfItems: number; 
  
  ItemsPerPageChange : number = 10;
  NumOfPagesInRange : number = 5;
         
  @Output() getItemsPerPageChange = new EventEmitter<number>();
 
  get NumOfPages(): number{

    return Math.ceil(this.NumOfItems /  this.ItemsPerPageChange);
  }

  OnGetCurrentPageChange(page){
    if(page < 1 || page > this.NumOfPages)
      return;
    this.GetCurrentPage = page;    
    if(this.GetCurrentPage < this.fromRange || this.GetCurrentPage > this.toRange)
    {
      if(this.GetCurrentPage === 1){
        this.fromRange = 1
        this.toRange =  Math.min(this.NumOfPagesInRange,this.NumOfPages);
      }
      else if(this.GetCurrentPage === this.NumOfPages){
        this.fromRange = this.NumOfPages - Math.min(this.NumOfPagesInRange,this.NumOfPages) + 1
        this.toRange = this.NumOfPages;
      } 
      else if(this.GetCurrentPage - this.toRange === 1){
        this.fromRange ++;
        this.toRange ++;
      }
      else if(this.GetCurrentPage - this.fromRange === -1 && this.GetCurrentPage > 1){
        this.fromRange --;
        this.toRange --;
      }   
    }

    this.ReloadNumbersRange();       
    this.GetCurrentPageChange.emit(page);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      if(propName === 'GetCurrentPage' && chng.currentValue !=  chng.previousValue)
      {        
        this.OnGetCurrentPageChange(chng.currentValue);
      }           
      if(propName === 'NumOfItems' && chng.currentValue !=  chng.previousValue){         
          this.GetCurrentPage = 1;
          this.fromRange = 1;
          this.toRange = Math.min(this.NumOfPages,this.maxPagesInRange);        
          this.ReloadNumbersRange();              
      }
    }
  }

  ReloadNumbersRange(): void{
    this.PageNumbersRange = [];
    for(let i = this.fromRange;i<=this.toRange;i++)
      this.PageNumbersRange.push(i); 
   
  }
}
