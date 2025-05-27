import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';

import { ValuesManagerService } from '../../values-manager.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'

import { TimerComponent } from '../timer/timer.component';
import { StepOneInstructionsComponent } from './step-one-instructions/step-one-instructions.component';
import { StepOneReviewDialogueComponent } from './step-one-review-dialogue/step-one-review-dialogue.component';

@Component({
  selector: 'app-step-one',
  imports: [TimerComponent, NgIf, MatDialogModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.css'
})
export class StepOneComponent implements OnInit{
  valuesService = inject(ValuesManagerService);
  valueIndex = 0;
  numVals = this.valuesService.getValsLength();
  isFinished = false;
  readonly dialog = inject(MatDialog)
  @ViewChild(TimerComponent) timer!: TimerComponent;

  ngOnInit(): void {
    const introRef = this.dialog.open(StepOneInstructionsComponent);

    introRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      this.timer.start();
    });
  }

  openInstructions(): void{
    this.timer.stop();
    const introRef = this.dialog.open(StepOneInstructionsComponent);

    introRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      this.timer.start();
    });
  }

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

    // reviewRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
