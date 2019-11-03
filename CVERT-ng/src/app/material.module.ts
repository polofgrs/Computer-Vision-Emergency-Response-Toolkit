import { MatIconModule, MatInputModule, MatSelectModule, MatSliderModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgModule } from '@angular/core';

@NgModule ({
  imports: [
    DragDropModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports: [
    DragDropModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatCheckboxModule
  ]
})

export class MaterialModule { }
