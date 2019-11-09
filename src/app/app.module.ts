import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DxGanttModule,  DxTemplateModule, DxPieChartModule } from 'devextreme-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxGanttModule,  DxTemplateModule, DxPieChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
