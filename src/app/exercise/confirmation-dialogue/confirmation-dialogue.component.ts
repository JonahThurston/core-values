import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-confirmation-dialogue',
  imports: [MatDialogModule, MatIcon],
  templateUrl: './confirmation-dialogue.component.html',
  styleUrl: './confirmation-dialogue.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogueComponent {
  data = inject(MAT_DIALOG_DATA);
  message = this.data.message;
}
