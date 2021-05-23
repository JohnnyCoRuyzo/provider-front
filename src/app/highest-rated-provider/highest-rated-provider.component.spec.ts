import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestRatedProviderComponent } from './highest-rated-provider.component';

describe('HighestRatedProviderComponent', () => {
  let component: HighestRatedProviderComponent;
  let fixture: ComponentFixture<HighestRatedProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighestRatedProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighestRatedProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
