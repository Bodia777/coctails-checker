import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AsideComponent } from './components/aside/aside.component';
import { MainComponent } from './components/main/main.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrinkComponent } from './components/drink/drink.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    MainComponent,
    LoaderComponent,
    DrinkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
