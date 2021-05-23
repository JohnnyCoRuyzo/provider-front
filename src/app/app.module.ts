import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProviderComponent } from './provider/provider.component';
import { OrderByCategoryComponent } from './order-by-category/order-by-category.component';
import { HighestRatedProviderComponent } from './highest-rated-provider/highest-rated-provider.component';

@NgModule({
  declarations: [
    AppComponent,
    ProviderComponent,
    OrderByCategoryComponent,
    HighestRatedProviderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
