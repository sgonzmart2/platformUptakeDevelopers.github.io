import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmStatisticsMenuComponent } from './dm-statistics-menu.component';

describe('DmStatisticsMenuComponent', () => {
  let component: DmStatisticsMenuComponent;
  let fixture: ComponentFixture<DmStatisticsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmStatisticsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmStatisticsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
