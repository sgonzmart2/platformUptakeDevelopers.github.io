import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcTabComponent } from './pc-tab.component';

describe('PcTabComponent', () => {
  let component: PcTabComponent;
  let fixture: ComponentFixture<PcTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
