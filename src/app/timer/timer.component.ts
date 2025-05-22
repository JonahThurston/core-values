import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  template: '<p>{{getTimeString()}}</p>',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy{
  minutesLeft: number = 10;
  secondsLeft: number = 0;
  intervalId: any; //This is really supposed to be Nodejs.Timeout, but I dont care to figure that out. 
  timesUp: boolean = false;

  getTimeString(): string{
    const timesUpPrefix = this.timesUp ? '-' : '';
    const minutes = this.minutesLeft.toString().padStart(2, '0');
    const seconds = this.secondsLeft.toString().padStart(2, '0');

    return `${timesUpPrefix}${minutes}:${seconds}`
  }

  ngOnInit(): void{
    this.intervalId = setInterval(() => {
      if(!this.timesUp){
        this.secondsLeft--;

        if (this.secondsLeft < 0){
          this.minutesLeft--;

          if(this.minutesLeft < 0){
            this.secondsLeft = 0;
            this.minutesLeft = 0
            this.timesUp = true;
          }
          else{
            this.secondsLeft = 59;
          }
        }
      } 

      else {
        this.secondsLeft++;

        if(this.secondsLeft > 59){
          this.minutesLeft++;
          this.secondsLeft = 0;
        }
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
