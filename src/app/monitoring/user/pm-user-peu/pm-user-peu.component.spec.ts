import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMUserPEUComponent } from './pm-user-peu.component';

describe('PMUserPEUComponent', () => {
  let component: PMUserPEUComponent;
  let fixture: ComponentFixture<PMUserPEUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMUserPEUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMUserPEUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
