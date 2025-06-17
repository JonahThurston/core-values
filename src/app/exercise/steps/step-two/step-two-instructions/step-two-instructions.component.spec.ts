import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTwoInstructionsComponent } from './step-two-instructions.component';

describe('StepTwoInstructionsComponent', () => {
  let component: StepTwoInstructionsComponent;
  let fixture: ComponentFixture<StepTwoInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepTwoInstructionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepTwoInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
