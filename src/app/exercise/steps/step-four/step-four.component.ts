import { Component, model } from '@angular/core';

@Component({
  selector: 'app-step-four',
  imports: [],
  templateUrl: './step-four.component.html',
  styleUrl: './step-four.component.css'
})
export class StepFourComponent {
  stepNumber = model(4);

  proceedToNextStep(){
    this.stepNumber.update(oldValue => oldValue + 1);
  }
}
