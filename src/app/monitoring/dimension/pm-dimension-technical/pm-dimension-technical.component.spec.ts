import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMDimensionTechnicalComponent } from './pm-dimension-technical.component';

describe('PMDimensionTechnicalComponent', () => {
  let component: PMDimensionTechnicalComponent;
  let fixture: ComponentFixture<PMDimensionTechnicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMDimensionTechnicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMDimensionTechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
