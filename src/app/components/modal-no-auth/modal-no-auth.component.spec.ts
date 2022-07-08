import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNoAuthComponent } from './modal-no-auth.component';

describe('ModalNoAuthComponent', () => {
  let component: ModalNoAuthComponent;
  let fixture: ComponentFixture<ModalNoAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNoAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNoAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
