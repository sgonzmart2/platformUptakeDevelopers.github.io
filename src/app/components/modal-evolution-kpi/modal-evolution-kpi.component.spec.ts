import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEvolutionKpiComponent } from './modal-evolution-kpi.component';

describe('ModalEvolutionKpiComponent', () => {
  let component: ModalEvolutionKpiComponent;
  let fixture: ComponentFixture<ModalEvolutionKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEvolutionKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEvolutionKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
