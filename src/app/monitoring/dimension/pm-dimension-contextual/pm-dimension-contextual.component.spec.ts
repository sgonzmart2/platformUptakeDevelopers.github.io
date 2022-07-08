import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMDimensionContextualComponent } from './pm-dimension-contextual.component';

describe('PMDimensionContextualComponent', () => {
  let component: PMDimensionContextualComponent;
  let fixture: ComponentFixture<PMDimensionContextualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMDimensionContextualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMDimensionContextualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
