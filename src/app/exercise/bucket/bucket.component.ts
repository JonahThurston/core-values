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
    '#139ba5',
    '#f15b32',
    '#fcce0e',
  ];
  fillColor = computed(() => {return this.colors[this.bucketId() % this.colors.length];})
}
