import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCMenuComponent } from './pc-menu.component';

describe('PCMenuComponent', () => {
  let component: PCMenuComponent;
  let fixture: ComponentFixture<PCMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
