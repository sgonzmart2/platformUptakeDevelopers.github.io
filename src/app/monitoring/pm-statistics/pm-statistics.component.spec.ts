import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMStatisticsComponent } from './pm-statistics.component';

describe('PMStatisticsComponent', () => {
  let component: PMStatisticsComponent;
  let fixture: ComponentFixture<PMStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
