import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";

import {LearnMoreComponent} from "../learn-more/learn-more.component";
import { QuickStartComponent } from '../quick-start/quick-start.component';
import {docRoutes} from "./doc.routes";
@NgModule({
  declarations: [
    QuickStartComponent, LearnMoreComponent
  ],
    imports: [
        CommonModule, RouterModule, RouterModule.forChild(docRoutes), MatSidenavModule
    ]
})
export class DocModule { }
