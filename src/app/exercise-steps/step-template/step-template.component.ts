import { Component, effect, inject, signal, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { TimerComponent } from '../timer/timer.component';
import { StepOneComponent } from '../step-one/step-one.component';
import { StepTwoComponent } from '../step-two/step-two.component';
import { StepInstructionsComponent } from './step-instructions/step-instructions.component';

@Component({
  selector: 'app-step-template',
  imports: [RouterModule, TimerComponent, StepOneComponent, StepTwoComponent],
  templateUrl: './step-template.component.html',
  styleUrl: './step-template.component.css'
})
export class StepTemplateComponent {
  stepNumber = signal(1);

  readonly dialog = inject(MatDialog)
  @ViewChild(TimerComponent) timer!: TimerComponent;

  constructor(){
    effect(() => {
      const step = this.stepNumber();
      if (step > 1 && this.timer){
        this.setNewTimer();
        this.openInstructions();
      }
    });
  }
  
  ngOnInit(): void {
    const introRef = this.dialog.open(StepInstructionsComponent, {
      data: {stepNumber: this.stepNumber()}
    });

    introRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      this.timer.reset(7);
      this.timer.start();
    });
  }

  setNewTimer(): void{
    switch(this.stepNumber()){
      case(1) : {
        this.timer.reset(7);
        break;
      }
      case(2) : {
        this.timer.reset(10);
        break;
      }
      case(3) : {
        this.timer.reset(5);
        break;
      }
      case(4) : {
        this.timer.reset(2);
        break;
      }
      default : {
        this.timer.reset(7);
      }
    }
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
