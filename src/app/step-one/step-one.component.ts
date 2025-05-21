import { Component, inject } from '@angular/core';
import { StepOneInstructionsComponent } from '../step-one-instructions/step-one-instructions.component';
import { TimerComponent } from '../timer/timer.component';
import { ValuesManagerService } from '../values-manager.service';

@Component({
  selector: 'app-step-one',
  imports: [StepOneInstructionsComponent, TimerComponent],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.css'
})
export class StepOneComponent {
  valuesService = inject(ValuesManagerService);
  valueIndex = 0;
  numVals = this.valuesService.getValsLength();

  getCurrentWord(): string {
    if (this.valueIndex === this.numVals){
      return 'Finished!'
    }
    else{
      return this.valuesService.getValAt(this.valueIndex).value;
    }
  }

  valDecideTrash(trash: boolean) {
    this.valuesService.setTrashed(this.valueIndex, trash);
    if (this.valueIndex < this.numVals){
      this.valueIndex++;
    }
  }

  undoDecision() {
    if (this.valueIndex > 0){
      this.valueIndex--;
      this.valuesService.setTrashed(this.valueIndex, false);
    }
  }

  getTrashedPercent() {
    return this.valuesService.getPercentTrashed().toFixed(2);
  }
}
