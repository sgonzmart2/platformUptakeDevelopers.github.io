import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InDeepRatingsComponent } from './in-deep-ratings.component';

describe('InDeepRatingsComponent', () => {
  let component: InDeepRatingsComponent;
  let fixture: ComponentFixture<InDeepRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InDeepRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InDeepRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
