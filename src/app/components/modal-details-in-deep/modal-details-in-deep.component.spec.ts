import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailsInDeepComponent } from './modal-details-in-deep.component';

describe('ModalDetailsInDeepComponent', () => {
  let component: ModalDetailsInDeepComponent;
  let fixture: ComponentFixture<ModalDetailsInDeepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailsInDeepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailsInDeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
