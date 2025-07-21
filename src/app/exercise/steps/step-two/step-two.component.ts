import { Component, computed, inject, model, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BucketInfoDialogueComponent } from '../../bucket-info-dialogue/bucket-info-dialogue.component';
import { ConfirmationDialogueComponent } from '../../confirmation-dialogue/confirmation-dialogue.component';
import { CoreValue } from '../../service/core-value';
import { ValueBucket } from '../../service/value-bucket';
import { ValuesManagerService } from '../../service/values-manager.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-step-two',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css'
})
export class StepTwoComponent {
  valuesService = inject(ValuesManagerService);
  readonly dialog = inject(MatDialog);
  
  stepNumber = model(2);
  currentIndex = signal(0)
  currentValue = computed(() => this.getValueByIndex(this.currentIndex()))
  buckets = this.valuesService.getBucketSignal();
  numBuckets = computed(() => this.buckets().length)
  
  valueIndex = 0;
  numVals = this.valuesService.getValsLength();
  isFinished = signal(false);
  
  getValueByIndex(id: number): CoreValue {
    if (id >= this.numVals){
      throw new Error("index out of range: " + id);
    }
    else if (id === -1){
      return {id: -1, value: "Finished!", trashed: false}
    }
    else{
      return this.valuesService.getValAt(id);
    }
  }
  
  createBucket() {
    this.valuesService.createBucket();
  }
  
  deleteBucket(id: number) {
    this.valuesService.deleteBucket(id);
  }
  
  openBucketDialogue(bucket: ValueBucket) {
    const reviewRef = this.dialog.open(BucketInfoDialogueComponent, {
      data: {inputBucket: bucket, stepNumber: this.stepNumber()}
    });
    
    reviewRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }

  addValueToBucket(val: CoreValue, bucket: ValueBucket) {
    if(!this.isFinished()){
      this.valuesService.addToBucket(val, bucket);
      this.advanceIndex();
    }
  }

  trashCurrentWord(){
    if(!this.isFinished()){
      const reviewRef = this.dialog.open(ConfirmationDialogueComponent, {
          data: {message: `Are you sure you want to trash value: ${this.currentValue().value}`}
        });
      
      reviewRef.afterClosed().subscribe(result => {
        if (result === "confirm"){
          this.valuesService.setTrashed(this.currentValue().id, true);
          this.advanceIndex();
        }
      });
    }
  }

  advanceIndex() {
    const currInd: number = this.currentIndex();
    this.currentIndex.set(this.valuesService.getNextNotTrashedId(currInd));
    if(this.currentIndex() === -1){
      this.isFinished.set(true);
    }
  }

  proceedToNextStep(){
    this.stepNumber.update(oldValue => oldValue + 1);
  }
}
