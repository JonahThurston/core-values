import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { TimerComponent } from '../timer/timer.component';
import { StepOneComponent } from '../step-one/step-one.component';
import { StepTwoComponent } from '../step-two/step-two.component';
import { StepInstructionsComponent } from '../../step-instructions/step-instructions.component';

@Component({
  selector: 'app-step-template',
  imports: [RouterModule, TimerComponent, StepOneComponent, StepTwoComponent],
  templateUrl: './step-template.component.html',
  styleUrl: './step-template.component.css'
})
export class StepTemplateComponent implements OnInit {
  stepNumber = signal(1);

  readonly dialog = inject(MatDialog)
  @ViewChild(TimerComponent) timer!: TimerComponent;

  ngOnInit(): void {
    const introRef = this.dialog.open(StepInstructionsComponent, {
      data: {stepNumber: this.stepNumber()}
    });

    introRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      this.timer.start();
    });
  }

  openInstructions(): void{
    this.timer.stop();
    
    const introRef = this.dialog.open(StepInstructionsComponent, {
      data: {stepNumber: this.stepNumber()}
    });

    introRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      this.timer.start();
    });
  }

}
