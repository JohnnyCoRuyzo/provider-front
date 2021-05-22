import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderByCategoryComponent } from './order-by-category.component';

describe('OrderByCategoryComponent', () => {
  let component: OrderByCategoryComponent;
  let fixture: ComponentFixture<OrderByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
