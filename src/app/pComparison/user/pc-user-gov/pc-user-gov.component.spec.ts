import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCUserGovComponent } from './pc-user-gov.component';

describe('PCUserGovComponent', () => {
  let component: PCUserGovComponent;
  let fixture: ComponentFixture<PCUserGovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCUserGovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCUserGovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
