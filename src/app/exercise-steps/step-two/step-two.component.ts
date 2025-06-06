import { Component, computed, inject, model, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ValuesManagerService } from '../service/values-manager.service';
import { CoreValue } from '../service/core-value';
import { ValueBucket } from '../service/value-bucket';
import { BucketInfoDialogueComponent } from './bucket-info-dialogue/bucket-info-dialogue.component';

@Component({
  selector: 'app-step-two',
  imports: [],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css'
})
export class StepTwoComponent {
  valuesService = inject(ValuesManagerService);
  readonly dialog = inject(MatDialog)
  
  stepNumber = model(2);
  currentIndex = signal(0)
  currentValue = computed(() => this.getValueByIndex(this.currentIndex()))
  buckets = signal<ValueBucket[]>([])
  
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
      data: {inputBucket: bucket}
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
      this.valuesService.setTrashed(this.currentValue().id, true);
      this.advanceIndex();
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
