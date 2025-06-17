import { Routes } from '@angular/router';
import { StepTemplateComponent } from './exercise/step-template/step-template.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'exercise',
        component: StepTemplateComponent,
        title: 'Core Values Exercise'
    }
];
