import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEvolutionComponent } from './modal-evolution.component';

describe('ModalEvolutionComponent', () => {
  let component: ModalEvolutionComponent;
  let fixture: ComponentFixture<ModalEvolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEvolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
