import { Component, inject, model } from '@angular/core';
import { ValuesManagerService } from '../../service/values-manager.service';
import { ValueBucket } from '../../service/value-bucket';
import { MatDialog } from '@angular/material/dialog';
import { BucketInfoDialogueComponent } from '../../bucket-info-dialogue/bucket-info-dialogue.component';

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

  valuesService = inject(ValuesManagerService);
  buckets = this.valuesService.getBucketSignal();
  readonly dialog = inject(MatDialog)

  openBucketDialogue(bucket: ValueBucket) {
    const reviewRef = this.dialog.open(BucketInfoDialogueComponent, {
      data: {inputBucket: bucket}
    });
    
    reviewRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }

}
