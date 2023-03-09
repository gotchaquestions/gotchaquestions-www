import { Routes } from '@angular/router';
import {QuickStartComponent} from "../quick-start/quick-start.component";
import {LearnMoreComponent} from "../learn-more/learn-more.component";


export const docRoutes: Routes = [
  {path: 'quick-start', component: QuickStartComponent },
  {path: 'more', component: LearnMoreComponent}
];
