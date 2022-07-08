import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCUserTPComponent } from './pc-user-tp.component';

describe('PCUserTPComponent', () => {
  let component: PCUserTPComponent;
  let fixture: ComponentFixture<PCUserTPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCUserTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCUserTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
