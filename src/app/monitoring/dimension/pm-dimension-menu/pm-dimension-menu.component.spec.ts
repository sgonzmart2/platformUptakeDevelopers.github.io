import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMDimensionMenuComponent } from './pm-dimension-menu.component';

describe('PMDimensionMenuComponent', () => {
  let component: PMDimensionMenuComponent;
  let fixture: ComponentFixture<PMDimensionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMDimensionMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMDimensionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
