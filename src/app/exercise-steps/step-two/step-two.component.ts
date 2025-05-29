import { Component, computed, inject, model, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ValuesManagerService } from '../service/values-manager.service';
import { CoreValue } from '../service/core-value';
import { ValueBucket } from '../service/value-bucket';

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
      return {id: -1, value: 'Finished', trashed: false}
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

  openBucketDialogue(id: number) {

  }
  
  trashCurrentWord(){
    this.valuesService.setTrashed(this.currentValue().id, true);
    this.currentIndex.update(oldValue => oldValue + 1);
  }

  proceedToNextStep(){
    this.stepNumber.update(oldValue => oldValue + 1);
  }
}
