import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { StepOneInstructionsComponent } from '../../steps/step-one/step-one-instructions/step-one-instructions.component';
import { StepTwoInstructionsComponent } from '../../steps/step-two/step-two-instructions/step-two-instructions.component';
import { StepThreeInstructionsComponent } from '../../steps/step-three/step-three-instructions/step-three-instructions.component';
import { StepFourInstructionsComponent } from '../../steps/step-four/step-four-instructions/step-four-instructions.component';
import { MatIcon } from '@angular/material/icon';

export interface DialogData {
  stepNumber: number;
}

@Component({
  selector: 'app-step-instructions',
  imports: [
    MatDialogModule,
    StepOneInstructionsComponent,
    StepTwoInstructionsComponent,
    StepThreeInstructionsComponent,
    StepFourInstructionsComponent,
    MatIcon,
  ],
  templateUrl: './step-instructions.component.html',
  styleUrl: './step-instructions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepInstructionsComponent {
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly stepNumber = model(this.data.stepNumber);
}
