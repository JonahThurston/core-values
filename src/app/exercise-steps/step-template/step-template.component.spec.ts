import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTemplateComponent } from './step-template.component';

describe('StepTemplateComponent', () => {
  let component: StepTemplateComponent;
  let fixture: ComponentFixture<StepTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
