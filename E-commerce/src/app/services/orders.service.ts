import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/orders';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orders:Order[]=[]
  Cart: Product[] = [];
  product_exist:boolean=false;
  constructor(private http:HttpClient) { }
    
  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>("http://localhost:5000/orders")
  }
  CreateOrder():Observable<Order>{
    return this.http.post<Order>("http://localhost:5000/order",{status:"active",user_id:"1"})
  }
  getCartProducts(): Product[] {
    return JSON.parse(localStorage.getItem('Cart')!);
    }
  add(product: Product){
    //if there is no products in the cart 
   if (this.getCartProducts() == null){
     this.Cart.push(product);
   }else{
     this.Cart= this.getCartProducts();

   //in case the product is in cart so we can add to the quantity
   for (let index = 0; index < this.Cart.length; index++) {
     if (product.id == this.Cart[index].id) {
       this.Cart[index].quantity += product.quantity;
       this.product_exist = true;
     }
   }
   if(this.product_exist === false){
     this.Cart.push(product);
   }
  }
  this.product_exist = false;
   localStorage.setItem('Cart',JSON.stringify(this.Cart));
    return `The Product ${product.name} ${product.category}  added to  Cart !`;
  }
  remove(product:Product):void{
  this.Cart= this.getCartProducts();
  for (let index = 0; index < this.Cart.length; index++) {
    if (product.id == this.Cart[index].id) {
      this.Cart.splice(index,1);

    }
  }
  localStorage.setItem('Cart',JSON.stringify(this.Cart));
  alert( `The Product ${product.name} Had been removed from The Cart !`);
  } 
  modifyCart(product: Product): Product[]{
  this.Cart = this.getCartProducts();
  for (let index = 0; index < this.Cart.length; index++) {
    if (product.id == this.Cart[index].id) {
      this.Cart[index].quantity = product.quantity;
     
    }
  }
  localStorage.setItem('Cart',JSON.stringify(this.Cart));
  // alert( `The Product ${product.name} Quantity Updated With ${product.quantity} !`);
return this.Cart
  }
  Clear(): void{
  this.Cart = [];
  localStorage.setItem('Cart',JSON.stringify(this.Cart));
  }
}



