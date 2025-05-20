import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepOneInstructionsComponent } from './step-one-instructions.component';

describe('StepOneInstructionsComponent', () => {
  let component: StepOneInstructionsComponent;
  let fixture: ComponentFixture<StepOneInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepOneInstructionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepOneInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
