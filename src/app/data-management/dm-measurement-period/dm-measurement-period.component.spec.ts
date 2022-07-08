import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmMeasurementPeriodComponent } from './dm-measurement-period.component';

describe('DmMeasurementPeriodComponent', () => {
  let component: DmMeasurementPeriodComponent;
  let fixture: ComponentFixture<DmMeasurementPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmMeasurementPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmMeasurementPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
