import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmPlatformComponent } from './dm-platform.component';

describe('DmPlatformComponent', () => {
  let component: DmPlatformComponent;
  let fixture: ComponentFixture<DmPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
