import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmKpiComponent } from './dm-kpi.component';

describe('DmKpiComponent', () => {
  let component: DmKpiComponent;
  let fixture: ComponentFixture<DmKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
