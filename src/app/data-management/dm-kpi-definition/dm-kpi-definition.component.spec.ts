import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmKpiDefinitionComponent } from './dm-kpi-definition.component';

describe('DmKpiDefinitionComponent', () => {
  let component: DmKpiDefinitionComponent;
  let fixture: ComponentFixture<DmKpiDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmKpiDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmKpiDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
