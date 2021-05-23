import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProviderComponent } from './provider/provider.component';
import { OrderByCategoryComponent } from './order-by-category/order-by-category.component';
import { HighestRatedProviderComponent } from './highest-rated-provider/highest-rated-provider.component';

import { ProviderService } from './provider-services/provider.service';

@NgModule({
  declarations: [
    AppComponent,
    ProviderComponent,
    OrderByCategoryComponent,
    HighestRatedProviderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
