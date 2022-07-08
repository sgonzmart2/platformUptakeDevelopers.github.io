import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCDimensionMenuComponent } from './pc-dimension-menu.component';

describe('PCDimensionMenuComponent', () => {
  let component: PCDimensionMenuComponent;
  let fixture: ComponentFixture<PCDimensionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCDimensionMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCDimensionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
