import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCGlobalScoreComponent } from './pc-global-score.component';

describe('PCGlobalScoreComponent', () => {
  let component: PCGlobalScoreComponent;
  let fixture: ComponentFixture<PCGlobalScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCGlobalScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCGlobalScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
