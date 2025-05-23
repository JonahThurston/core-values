import { Routes } from '@angular/router';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';

export const routes: Routes = [
    {
        path: '',
        component: StepOneComponent,
        title: 'Step 1'
    },
    {
        path: 'step-two',
        component: StepTwoComponent,
        title: 'Step 2'
    }
];
