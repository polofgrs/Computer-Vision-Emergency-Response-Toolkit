import { MatIconModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgModule } from '@angular/core';

@NgModule ({
  imports: [
    DragDropModule,
    /*MatButtonModule,
    MatCheckboxModule,
    MatGridListModule*/
    MatIconModule
  ],
  exports: [
    DragDropModule,
    // CdkDragDrop,
    /*MatButtonModule,
    MatCheckboxModule,
    MatGridListModule*/
    MatIconModule
  ]
})

export class MaterialModule { }
