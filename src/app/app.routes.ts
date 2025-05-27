import { Routes } from '@angular/router';
import { StepOneComponent } from './quiz-steps/step-one/step-one.component';
import { StepTwoComponent } from './quiz-steps/step-two/step-two.component';
import { StepTemplateComponent } from './quiz-steps/step-template/step-template.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'steps',
        component: StepTemplateComponent,
        children: [
            {
                path: 'one',
                component: StepOneComponent,
            },
            {
                path: 'two',
                component: StepTwoComponent
            }
        ]
    }
];
