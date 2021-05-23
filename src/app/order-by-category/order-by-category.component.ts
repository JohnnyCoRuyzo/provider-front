import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-by-category',
  templateUrl: './order-by-category.component.html',
  styleUrls: ['./order-by-category.component.css']
})
export class OrderByCategoryComponent implements OnInit {
  @Input() category!: any;
  @Output() categoryChange = new EventEmitter<string>();
  name: string = "";
  checked: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.initializeCategory(this.category);
  }

  initializeCategory(category: any){
    this.name = category.categoryName;
    this.checked = category.categoryChecked;
  }

  categoryChanged(){
    this.checked=!this.checked;
    this.categoryChange.emit(this.name);
  }
}
