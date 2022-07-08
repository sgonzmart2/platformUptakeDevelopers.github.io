import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNoPermisionsComponent } from './modal-no-permisions.component';

describe('ModalNoPermisionsComponent', () => {
  let component: ModalNoPermisionsComponent;
  let fixture: ComponentFixture<ModalNoPermisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNoPermisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNoPermisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
