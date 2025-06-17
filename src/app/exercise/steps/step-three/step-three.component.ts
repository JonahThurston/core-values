import { Component, model } from '@angular/core';

@Component({
  selector: 'app-step-three',
  imports: [],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.css'
})
export class StepThreeComponent {
  stepNumber = model(3);

  proceedToNextStep(){
    this.stepNumber.update(oldValue => oldValue + 1);
  }

}
