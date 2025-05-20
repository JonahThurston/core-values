import { Component } from '@angular/core';
import { StepOneInstructionsComponent } from '../step-one-instructions/step-one-instructions.component';

@Component({
  selector: 'app-step-one',
  imports: [StepOneInstructionsComponent],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.css'
})
export class StepOneComponent {
  percentTrashed = "61.73%"
}
