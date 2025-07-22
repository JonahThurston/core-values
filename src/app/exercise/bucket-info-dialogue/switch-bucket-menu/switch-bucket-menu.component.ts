import { Component, inject, Input, input, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { CoreValue } from '../../service/core-value';
import { ValueBucket } from '../../service/value-bucket';
import { ValuesManagerService } from '../../service/values-manager.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-switch-bucket-menu',
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  template: `
    <button mat-icon-button [matMenuTriggerFor]="switchBucketMenu" class="menu-button">
      <mat-icon>move_down</mat-icon>
    </button>
    <mat-menu #switchBucketMenu="matMenu">
      @for (newBucket of bucketList; track newBucket.id) {
        <button (click)="switchBuckets(newBucket)" mat-menu-item>switch to bucket: {{newBucket.id + 1}}</button>
      }
    </mat-menu>
  `,
  styleUrl: './switch-bucket-menu.component.css'
})
export class SwitchBucketMenuComponent implements OnInit{
  valuesService = inject(ValuesManagerService);

  @Input() oldBucket: ValueBucket = {id: -1, name: 'defaultGeneratedBucket', color: 'red', values: []};
  @Input() value: CoreValue = {id: -1, value: 'default', trashed: true}
  bucketList: ValueBucket[] = [];

  ngOnInit(): void {
    this.bucketList = this.valuesService.getAllBuckets().filter((bucket) => this.oldBucket.id != bucket.id);
  }

  switchBuckets(newBucket: ValueBucket){
    if(this.oldBucket.id === -1 || this.value.id === -1){
      console.error(`invalid bucket or value used. Don't forget to pass those as arguments to the component`)
      return
    }

    this.valuesService.switchBuckets(this.value, this.oldBucket, newBucket);
  }
}
