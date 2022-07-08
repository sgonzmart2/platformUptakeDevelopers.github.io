import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMUserTPComponent } from './pm-user-tp.component';

describe('PMUserTPComponent', () => {
  let component: PMUserTPComponent;
  let fixture: ComponentFixture<PMUserTPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMUserTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMUserTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
