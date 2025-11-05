import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  template: '<p class="timer-text">{{getTimeString()}}</p>',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnDestroy {
  minutesLeft: number = 5;
  secondsLeft: number = 0;
  intervalId: any; //This is really supposed to be Nodejs.Timeout, but I dont care to figure that out.
  timesUp: boolean = false;

  ngOnDestroy() {
    this.stop();
  }

  start(): void {
    this.intervalId = setInterval(() => {
      if (!this.timesUp) {
        this.secondsLeft--;

        if (this.secondsLeft < 0) {
          this.minutesLeft--;

          if (this.minutesLeft < 0) {
            this.secondsLeft = 0;
            this.minutesLeft = 0;
            this.timesUp = true;
          } else {
            this.secondsLeft = 59;
          }
        }
      } else {
        this.secondsLeft++;

        if (this.secondsLeft > 59) {
          this.minutesLeft++;
          this.secondsLeft = 0;
        }
      }
    }, 1000);
  }

  stop(): void {
    clearInterval(this.intervalId);
  }

  reset(minutes: number): void {
    this.minutesLeft = minutes;
    this.secondsLeft = 0;
  }

  getTimeString(): string {
    const timesUpPrefix = this.timesUp ? '-' : '';
    const minutes = this.minutesLeft.toString().padStart(2, '0');
    const seconds = this.secondsLeft.toString().padStart(2, '0');

    return `${timesUpPrefix}${minutes}:${seconds}`;
  }
}
