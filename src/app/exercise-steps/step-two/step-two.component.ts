import { Component, inject, model } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ValuesManagerService } from '../service/values-manager.service';

@Component({
  selector: 'app-step-two',
  imports: [],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css'
})
export class StepTwoComponent {
  stepNumber = model(1);

  valuesService = inject(ValuesManagerService);
  readonly dialog = inject(MatDialog)
  
  createBucket() {
  }
  
  trashCurrentWord(){

  }

  proceedToNextStep(){
    this.stepNumber.update(oldValue => oldValue + 1);
  }
}
