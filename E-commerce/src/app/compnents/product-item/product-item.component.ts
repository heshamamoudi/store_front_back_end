import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OrdersService } from 'src/app/services/orders.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() Products:Product;
  option_list:number[]=[1,2,3,4,5,6,7,8,9,10]
  quants:number=1
  @Output()  addproduct: EventEmitter<Product> = new EventEmitter;
  constructor(private OrdersService:OrdersService) {
    this.Products={
      id:0,
      name:'',
      price:0,
      category:'',
      urlimage:'',
      quantity:0
    }

  }
  onSubmit():void{
     this.Products.quantity=this.quants
    this.addproduct.emit(this.Products)
    
  }
  ngOnInit(): void {
  }

}
