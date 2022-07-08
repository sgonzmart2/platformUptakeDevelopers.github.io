import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCUserEUCComponent } from './pc-user-euc.component';

describe('PCUserEUCComponent', () => {
  let component: PCUserEUCComponent;
  let fixture: ComponentFixture<PCUserEUCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCUserEUCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCUserEUCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
