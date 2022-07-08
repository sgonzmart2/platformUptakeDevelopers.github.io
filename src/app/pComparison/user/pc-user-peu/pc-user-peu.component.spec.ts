import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCUserPEUComponent } from './pc-user-peu.component';

describe('PCUserPEUComponent', () => {
  let component: PCUserPEUComponent;
  let fixture: ComponentFixture<PCUserPEUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCUserPEUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCUserPEUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
