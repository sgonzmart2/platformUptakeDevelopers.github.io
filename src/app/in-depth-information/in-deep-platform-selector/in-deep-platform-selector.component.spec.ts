import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InDeepPlatformSelectorComponent } from './in-deep-platform-selector.component';

describe('InDeepPlatformSelectorComponent', () => {
  let component: InDeepPlatformSelectorComponent;
  let fixture: ComponentFixture<InDeepPlatformSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InDeepPlatformSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InDeepPlatformSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
