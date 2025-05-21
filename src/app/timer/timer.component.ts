import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  template: '<p>{{minutesLeft}}:{{secondsLeft}}</p>',
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  minutesLeft: number = 0;
  secondsLeft: number = 59;
  intervalId: any;

  ngOnInit(): void{
    this.intervalId = setInterval(() => {
      this.secondsLeft--;
      if (this.secondsLeft < 0){
        this.minutesLeft--;
        this.secondsLeft = 59;
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
