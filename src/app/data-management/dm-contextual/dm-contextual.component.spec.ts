import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmContextualComponent } from './dm-contextual.component';

describe('DmContextualComponent', () => {
  let component: DmContextualComponent;
  let fixture: ComponentFixture<DmContextualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmContextualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmContextualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
