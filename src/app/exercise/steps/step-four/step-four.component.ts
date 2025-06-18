import { Component, inject, model } from '@angular/core';
import { ValuesManagerService } from '../../service/values-manager.service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ValueBucket } from '../../service/value-bucket';
import { ConfirmationDialogueComponent } from '../../confirmation-dialogue/confirmation-dialogue.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-step-four',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './step-four.component.html',
  styleUrl: './step-four.component.css'
})
export class StepFourComponent {
  stepNumber = model(4);
  readonly dialog = inject(MatDialog)

  proceedToNextStep(){
    const reviewRef = this.dialog.open(ConfirmationDialogueComponent, {
      data: {message: 'Are you ready to lock in your value ordering?'}
    });
          
    reviewRef.afterClosed().subscribe(result => {
      if (result === "confirm"){
        this.stepNumber.update(oldValue => oldValue + 1);
      }
    });
  }

  valuesService = inject(ValuesManagerService);
  allBuckets = this.valuesService.getBucketSignal();

  drop(event: CdkDragDrop<ValueBucket[]>) {
    this.allBuckets.update((bucketArray) => {
      moveItemInArray(bucketArray, event.previousIndex, event.currentIndex)
      return bucketArray
    })
  }
}
