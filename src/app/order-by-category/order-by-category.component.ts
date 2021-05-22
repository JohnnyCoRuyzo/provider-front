import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-by-category',
  templateUrl: './order-by-category.component.html',
  styleUrls: ['./order-by-category.component.css']
})
export class OrderByCategoryComponent implements OnInit {
  @Input() category!: any;
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
}
