import { MatIconModule, MatInputModule, MatSelectModule, MatSliderModule, MatButtonModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgModule } from '@angular/core';

@NgModule ({
  imports: [
    DragDropModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule
  ],
  exports: [
    DragDropModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule
  ]
})

export class MaterialModule { }
