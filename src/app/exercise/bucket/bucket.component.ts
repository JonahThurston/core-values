import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-bucket',
  imports: [],
  templateUrl: './bucket.component.html',
  styleUrl: './bucket.component.css'
})
export class BucketComponent {
  bucketId = input.required<number>()

  private colors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#3F51B5',
    '#03A9F4',
    '#4CAF50',
    '#FF9800',
    '#795548',
  ];
  fillColor = computed(() => {return this.colors[this.bucketId() % this.colors.length];})
}
