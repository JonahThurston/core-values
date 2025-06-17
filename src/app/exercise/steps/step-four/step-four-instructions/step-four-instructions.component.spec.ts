import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFourInstructionsComponent } from './step-four-instructions.component';

describe('StepFourInstructionsComponent', () => {
  let component: StepFourInstructionsComponent;
  let fixture: ComponentFixture<StepFourInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepFourInstructionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepFourInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
