import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMDimensionBusinessComponent } from './pm-dimension-business.component';

describe('PMDimensionBusinessComponent', () => {
  let component: PMDimensionBusinessComponent;
  let fixture: ComponentFixture<PMDimensionBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PMDimensionBusinessComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMDimensionBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
