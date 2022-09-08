import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { OrdersService } from 'src/app/services/orders.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  Products_List:Product[]=[];
 
  constructor(private productGetter:ProductsService,private OrdersService:OrdersService) {
   
   }

  ngOnInit(): void {
this.productGetter.getProducts().subscribe(data =>{
this.Products_List=data;

})
  }

  addproduct(product:Product) {
    this.OrdersService.add({
      id:product.id,
      name: product.name,
      category:product.category,
      urlimage:product.urlimage,
      price:product.price,
      quantity:product.quantity,
    })
    alert(`product ${product.name} has been added to cart`)
  }
}
