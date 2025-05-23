import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ValuesManagerService } from '../values-manager.service';
import { CoreValue } from '../core-value';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-step-one-review-dialogue',
  imports: [MatDialogModule, CommonModule, RouterModule],
  templateUrl: './step-one-review-dialogue.component.html',
  styleUrl: './step-one-review-dialogue.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneReviewDialogueComponent implements OnInit{
  valuesService = inject(ValuesManagerService);
  userVals: CoreValue[] = [];

  ngOnInit(): void {
    this.valuesService.getValsObservable().subscribe(
      data => {
        this.userVals = data;
      }
    )
  }

  setTrash(id: number, trash: boolean) {
    this.valuesService.setTrashed(id, trash);
  }
}
