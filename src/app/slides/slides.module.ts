import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlidesComponent } from "./slides.component";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [SlidesComponent],
    imports: [CommonModule, MatDialogModule]
})
export class SlidesModule { }
