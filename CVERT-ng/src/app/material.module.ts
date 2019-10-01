import { MatButtonModule, MatCheckboxModule, MatIconModule, MatGridListModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule ({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatGridListModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatGridListModule
  ]
})

export class MaterialModule { }
