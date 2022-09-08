import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

import { CartComponent } from '../cart/cart.component';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user: User = new User();
  total:number=0
  constructor(private userService:UserService, private OrdersService:OrdersService,private Router:Router) { }

  ngOnInit(): void {
 
    this.user=this.userService.get()
    this.total=this.userService.getTotal()
  }

}
