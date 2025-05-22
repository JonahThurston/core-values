import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-step-one-review-dialogue',
  imports: [MatDialogModule],
  templateUrl: './step-one-review-dialogue.component.html',
  styleUrl: './step-one-review-dialogue.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneReviewDialogueComponent {

}
