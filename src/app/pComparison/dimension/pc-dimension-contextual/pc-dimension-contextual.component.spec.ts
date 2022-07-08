import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCDimensionContextualComponent } from './pc-dimension-contextual.component';

describe('PCDimensionContextualComponent', () => {
  let component: PCDimensionContextualComponent;
  let fixture: ComponentFixture<PCDimensionContextualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCDimensionContextualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCDimensionContextualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
