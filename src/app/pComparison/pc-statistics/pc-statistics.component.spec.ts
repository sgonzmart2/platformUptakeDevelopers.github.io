import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCStatisticsComponent } from './pc-statistics.component';

describe('PCStatisticsComponent', () => {
  let component: PCStatisticsComponent;
  let fixture: ComponentFixture<PCStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
