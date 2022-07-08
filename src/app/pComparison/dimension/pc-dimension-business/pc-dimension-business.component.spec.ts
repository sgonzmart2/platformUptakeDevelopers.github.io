import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCDimensionBusinessComponent } from './pc-dimension-business.component';

describe('PCDimensionBusinessComponent', () => {
  let component: PCDimensionBusinessComponent;
  let fixture: ComponentFixture<PCDimensionBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PCDimensionBusinessComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCDimensionBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
