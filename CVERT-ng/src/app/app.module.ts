import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ImageTabComponent } from './components/image-tab/image-tab.component';
import { FiltersTabComponent } from './components/filters-tab/filters-tab.component';
import { FilterEditTabComponent } from './components/filter-edit-tab/filter-edit-tab.component';
import { ServerTabComponent } from './components/server-tab/server-tab.component';
import { GpsTabComponent } from './components/gps-tab/gps-tab.component';
import { HistogramTabComponent } from './components/histogram-tab/histogram-tab.component';
import { ActionTabComponent } from './components/action-tab/action-tab.component';
import { AlgorithmParametersEditComponent } from './components/algorithm-parameters-edit/algorithm-parameters-edit.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageTabComponent,
    FiltersTabComponent,
    FilterEditTabComponent,
    ServerTabComponent,
    GpsTabComponent,
    HistogramTabComponent,
    ActionTabComponent,
    AlgorithmParametersEditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
