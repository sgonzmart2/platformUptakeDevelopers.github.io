import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCDimensionTechnicalComponent } from './pc-dimension-technical.component';

describe('PCDimensionTechnicalComponent', () => {
  let component: PCDimensionTechnicalComponent;
  let fixture: ComponentFixture<PCDimensionTechnicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCDimensionTechnicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCDimensionTechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
