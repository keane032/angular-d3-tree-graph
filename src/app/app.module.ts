import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TreeGraphComponent } from './tree-graph/tree-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeGraphComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
