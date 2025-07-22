import { Component, computed, effect, inject, model } from '@angular/core';
import { ValuesManagerService } from '../../service/values-manager.service';
import { ValueBucket } from '../../service/value-bucket';
import { MatDialog } from '@angular/material/dialog';
import { BucketInfoDialogueComponent } from '../../bucket-info-dialogue/bucket-info-dialogue.component';
import { BucketComponent } from "../../bucket/bucket.component";

@Component({
  selector: 'app-step-three',
  imports: [BucketComponent],
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
  isFinished = computed(() => !this.buckets().some(bucketToCheck => bucketToCheck.name === 'Name not set'))

  openBucketDialogue(bucket: ValueBucket) {
    const reviewRef = this.dialog.open(BucketInfoDialogueComponent, {
      data: {inputBucket: bucket, stepNumber: 3}
    });
    
    reviewRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }

}
