import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEvolutionStatisticsComponent } from './modal-evolution-statistics.component';

describe('ModalEvolutionStatisticsComponent', () => {
  let component: ModalEvolutionStatisticsComponent;
  let fixture: ComponentFixture<ModalEvolutionStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEvolutionStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEvolutionStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
