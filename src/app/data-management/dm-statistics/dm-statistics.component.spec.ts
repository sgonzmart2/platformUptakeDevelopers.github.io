import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmStatisticsComponent } from './dm-statistics.component';

describe('DmStatisticsComponent', () => {
  let component: DmStatisticsComponent;
  let fixture: ComponentFixture<DmStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
