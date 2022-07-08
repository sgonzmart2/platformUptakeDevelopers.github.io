import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMUserEUCComponent } from './pm-user-euc.component';

describe('PMUserEUCComponent', () => {
  let component: PMUserEUCComponent;
  let fixture: ComponentFixture<PMUserEUCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMUserEUCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMUserEUCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
