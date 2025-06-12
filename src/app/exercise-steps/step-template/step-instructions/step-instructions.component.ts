import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { StepOneInstructionsComponent } from '../../step-one/step-one-instructions/step-one-instructions.component';

export interface DialogData {
  stepNumber: number;
}

@Component({
  selector: 'app-step-instructions',
  imports: [MatDialogModule, StepOneInstructionsComponent],
  templateUrl: './step-instructions.component.html',
  styleUrl: './step-instructions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepInstructionsComponent {
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly stepNumber = model(this.data.stepNumber);

}
