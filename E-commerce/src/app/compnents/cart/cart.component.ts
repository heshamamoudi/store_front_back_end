import { Component, OnInit,Input } from '@angular/core';
import { Order } from 'src/app/models/orders';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
@Input() change: number=0;
cart:Product[]=[]
total:number=0
product_options: number[] = [1,2,3,4,5,6,7,8,9,10];
  user: User =new User();
  Fname: string = "";
  CCN: string = "";
  Address: string = "";
  Order:Order=new Order()
  constructor(private OrdersService:OrdersService,private UserService:UserService,public router: Router) { }

  ngOnInit(): void {
      this.cart= this.OrdersService.getCartProducts();
      this.total=this.TotalPrice()
}
public TotalPrice():number{
  let total=0
for (let index = 0; index < this.cart.length; index++) {
   total += (this.cart[index].price * this.cart[index].quantity);
  
}
return total;
}
changeOption(product: Product, event: any): void {
  
  let selectedOption = event;
  product.quantity = selectedOption;
 this.cart=this.OrdersService.modifyCart(product);
  this.total = this.TotalPrice();
  

}
removeFromCart(product: Product){
  console.log("method started")
  this.OrdersService.remove(product);
  this.cart = this.OrdersService.getCartProducts();
  this.total = this.TotalPrice();

}
onSubmit(Fname: string,Address: string,CCN: string){
  this.user.Fullname = Fname
  this.user.Address = Address;
  this.user.CCN = CCN;
  this.Order.total = this.total;
  // alert(`Thank You ${Fname} For Purchasing With Us`)
  this.UserService.add(this.user,this.total);
  this.OrdersService.Clear();
  this.router.navigate(['../checkout'])

}
}
