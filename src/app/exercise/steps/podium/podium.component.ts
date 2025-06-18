import { Component, inject } from '@angular/core';
import { ValuesManagerService } from '../../service/values-manager.service';

@Component({
  selector: 'app-podium',
  imports: [],
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.css'
})
export class PodiumComponent {
  valuesService = inject(ValuesManagerService);
  allBuckets = this.valuesService.getBucketSignal();

}
