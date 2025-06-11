import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ValuesManagerService } from '../../service/values-manager.service';
import { CoreValue } from '../../service/core-value';
import { ValueBucket } from '../../service/value-bucket';
import { SwitchBucketMenuComponent } from './switch-bucket-menu/switch-bucket-menu.component';

@Component({
  selector: 'app-bucket-info-dialogue',
  imports: [MatDialogModule, CommonModule, RouterModule, SwitchBucketMenuComponent],
  templateUrl: './bucket-info-dialogue.component.html',
  styleUrl: './bucket-info-dialogue.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BucketInfoDialogueComponent {
  valuesService = inject(ValuesManagerService);
  data = inject(MAT_DIALOG_DATA);
  bucket: ValueBucket = this.data.inputBucket;
  bucketVals: CoreValue[] = this.bucket.values;

}
