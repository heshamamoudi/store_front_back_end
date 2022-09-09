import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { OrdersService } from 'src/app/services/orders.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: string | null = '';
  product?:Product | undefined;
  productOptions: string[] = ["1","2","3","4","5","6","7","8","9","10"];
  constructor(private productService: ProductsService ,private ActivatedRoute: ActivatedRoute,private orderservice:OrdersService) { }

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id')
    })
    this.productService.getProduct(Number(this.id)).subscribe((data)=>{
    //  alert(data)
      this.product = data
    })

  }
  onSubmit(cartProduct: Product, event: any): void{
    const selectedOption = event.target[0].options[event.target[0].options.selectedIndex].value;
      cartProduct.quantity = parseInt(selectedOption);
      this.orderservice.add(cartProduct);
     alert(`product has been added to Cart ${this.product?.name}`)
  }

}
