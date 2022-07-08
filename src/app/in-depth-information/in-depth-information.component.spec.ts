import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InDepthInformationComponent } from './in-depth-information.component';

describe('InDepthInformationComponent', () => {
  let component: InDepthInformationComponent;
  let fixture: ComponentFixture<InDepthInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InDepthInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InDepthInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
