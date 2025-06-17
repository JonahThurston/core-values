import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepThreeInstructionsComponent } from './step-three-instructions.component';

describe('StepThreeInstructionsComponent', () => {
  let component: StepThreeInstructionsComponent;
  let fixture: ComponentFixture<StepThreeInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepThreeInstructionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepThreeInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
