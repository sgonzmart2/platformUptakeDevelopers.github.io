import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InDeepFeedbackComponent } from './in-deep-feedback.component';

describe('InDeepFeedbackComponent', () => {
  let component: InDeepFeedbackComponent;
  let fixture: ComponentFixture<InDeepFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InDeepFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InDeepFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
