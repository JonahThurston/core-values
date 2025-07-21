import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bucket',
  imports: [],
  templateUrl: './bucket.component.html',
  styleUrl: './bucket.component.css'
})
export class BucketComponent {
  fillColor = input.required<string>()
}
