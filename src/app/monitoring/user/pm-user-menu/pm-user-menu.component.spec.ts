import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMUserMenuComponent } from './pm-user-menu.component';

describe('PMUserMenuComponent', () => {
  let component: PMUserMenuComponent;
  let fixture: ComponentFixture<PMUserMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMUserMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
