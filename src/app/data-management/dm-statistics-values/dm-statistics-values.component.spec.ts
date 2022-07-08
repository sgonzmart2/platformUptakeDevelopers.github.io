import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmStatisticsValuesComponent } from './dm-statistics-values.component';

describe('DmStatisticsValuesComponent', () => {
  let component: DmStatisticsValuesComponent;
  let fixture: ComponentFixture<DmStatisticsValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmStatisticsValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmStatisticsValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
