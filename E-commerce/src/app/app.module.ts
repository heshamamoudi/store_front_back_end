import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './compnents/navbar/navbar.component';
import { ProductsComponent } from './compnents/products/products.component';
import { ProductItemComponent } from './compnents/product-item/product-item.component';
import { CartComponent } from './compnents/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './compnents/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    ProductItemComponent,
    CartComponent,
    CheckoutComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
