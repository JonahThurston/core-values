import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepInstructionsComponent } from './step-instructions.component';

describe('StepInstructionsComponent', () => {
  let component: StepInstructionsComponent;
  let fixture: ComponentFixture<StepInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepInstructionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
