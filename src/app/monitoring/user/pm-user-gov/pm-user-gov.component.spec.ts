import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMUserGovComponent } from './pm-user-gov.component';

describe('PMUserGovComponent', () => {
  let component: PMUserGovComponent;
  let fixture: ComponentFixture<PMUserGovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMUserGovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMUserGovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
