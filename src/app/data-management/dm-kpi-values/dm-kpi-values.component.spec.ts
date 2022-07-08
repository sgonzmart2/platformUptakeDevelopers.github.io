import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmKpiValuesComponent } from './dm-kpi-values.component';

describe('DmKpiValuesComponent', () => {
  let component: DmKpiValuesComponent;
  let fixture: ComponentFixture<DmKpiValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmKpiValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmKpiValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
