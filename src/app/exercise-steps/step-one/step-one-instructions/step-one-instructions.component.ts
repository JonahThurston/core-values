import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-step-one-instructions',
  imports: [MatDialogModule],
  templateUrl: './step-one-instructions.component.html',
  styleUrl: './step-one-instructions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneInstructionsComponent {

}
