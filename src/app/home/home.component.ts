import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router, RouterModule } from '@angular/router';
import { ConfirmationDialogueComponent } from '../exercise/confirmation-dialogue/confirmation-dialogue.component';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);
  private router = inject(Router);

  handleStartClick() {
    const reviewRef = this.dialog.open(ConfirmationDialogueComponent, {
      data: {
        message:
          'Are you ready to start the exercise? You will not be able to refresh your browser window or push its back button, or you may lose progress.',
      },
    });

    reviewRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.router.navigate(['/exercise']);
      }
    });
  }
}
