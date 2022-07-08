import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCUserMenuComponent } from './pc-user-menu.component';

describe('PCUserMenuComponent', () => {
  let component: PCUserMenuComponent;
  let fixture: ComponentFixture<PCUserMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCUserMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
