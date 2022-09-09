import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './compnents/cart/cart.component';
import { CheckoutComponent } from './compnents/checkout/checkout.component';
import { ProductDetailsComponent } from './compnents/product-details/product-details.component';
import { ProductsComponent } from './compnents/products/products.component';
const routes: Routes = [
  {path:'', component:ProductsComponent},
  {path:'cart', component:CartComponent},
  {path:'checkout', component:CheckoutComponent},
  { path: 'product-details/:id', component: ProductDetailsComponent },
  {path:'**', redirectTo:'/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
