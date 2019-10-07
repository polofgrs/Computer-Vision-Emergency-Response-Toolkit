// import { MatButtonModule, MatCheckboxModule, MatIconModule, MatGridListModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgModule } from '@angular/core';

@NgModule ({
  imports: [
    DragDropModule
    /*MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatGridListModule*/
  ],
  exports: [
    DragDropModule
    // CdkDragDrop,
    /*MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatGridListModule*/
  ]
})

export class MaterialModule { }
