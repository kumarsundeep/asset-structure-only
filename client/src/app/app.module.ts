import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from  '@angular/forms';
import {HttpModule} from  '@angular/http';
//import {RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { LayoutComponent } from './components/layout/layout.component';
import { ModalModule } from 'ngx-modal';
import { OverviewComponent } from './components/overview/overview.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    ModalModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
