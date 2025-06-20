import { Component, inject, model } from '@angular/core';
import { NgIf } from '@angular/common';

import { ValuesManagerService } from '../../service/values-manager.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'

import { StepOneReviewDialogueComponent } from './step-one-review-dialogue/step-one-review-dialogue.component';

@Component({
  selector: 'app-step-one',
  imports: [NgIf, MatDialogModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.css'
})
export class StepOneComponent{
  valuesService = inject(ValuesManagerService);
  readonly dialog = inject(MatDialog)

  valueIndex = 0;
  numVals = this.valuesService.getValsLength();
  isFinished = false;

  stepNumber = model(1);

  getCurrentWord(): string {
    if (this.valueIndex === this.numVals){
      return 'Finished!'
    }
    else{
      return this.valuesService.getValAt(this.valueIndex).value;
    }
  }

  valDecideTrash(trash: boolean) {
    if (this.valueIndex < this.numVals){
      this.valuesService.setTrashed(this.valueIndex, trash);
      this.valueIndex++;
      if (this.valueIndex === this.numVals){
        this.isFinished = true;
      }
    }
  }

  undoDecision() {
    if (this.valueIndex > 0){
      this.valueIndex--;
      this.isFinished = false;
      this.valuesService.setTrashed(this.valueIndex, false);
    }
  }

  getTrashedPercent() {
    return this.valuesService.getPercentTrashed().toFixed(2);
  }

  openReview() {
    const reviewRef = this.dialog.open(StepOneReviewDialogueComponent);

    reviewRef.afterClosed().subscribe(result => {
      if (result === "proceed"){
        this.proceedToNextStep();
      }
    });
  }

  proceedToNextStep() {
    this.stepNumber.update(oldValue => oldValue + 1);
  }
}
