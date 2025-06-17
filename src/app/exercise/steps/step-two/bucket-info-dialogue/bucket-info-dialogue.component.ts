import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogueComponent } from '../../../confirmation-dialogue/confirmation-dialogue.component';
import { CoreValue } from '../../../service/core-value';
import { ValueBucket } from '../../../service/value-bucket';
import { ValuesManagerService } from '../../../service/values-manager.service';
import { SwitchBucketMenuComponent } from './switch-bucket-menu/switch-bucket-menu.component';

@Component({
  selector: 'app-bucket-info-dialogue',
  imports: [MatDialogModule, CommonModule, RouterModule, SwitchBucketMenuComponent],
  templateUrl: './bucket-info-dialogue.component.html',
  styleUrl: './bucket-info-dialogue.component.css',
})
export class BucketInfoDialogueComponent {
  valuesService = inject(ValuesManagerService);
  data = inject(MAT_DIALOG_DATA);
  bucket: ValueBucket = this.data.inputBucket;
  bucketVals: CoreValue[] = this.bucket.values;
  readonly dialog = inject(MatDialog);
  canDeleteBucket = this.bucket.values.length > 0;
  numberOfBuckets = this.valuesService.getAllBuckets().length

  trashBucketVal = (val: CoreValue) => {
    const reviewRef = this.dialog.open(ConfirmationDialogueComponent, {
      data: {message: `Are you sure you want to trash value: ${val.value}`}
    });

    reviewRef.afterClosed().subscribe(result => {
      if (result === "confirm"){
        this.valuesService.trashValFromBucket(val, this.bucket)
      }
    });
  }

  deleteBucket = () => {
    this.valuesService.deleteBucket(this.bucket.id);
  }

}
