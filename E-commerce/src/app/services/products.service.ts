import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }


getProducts():Observable<Product[]>{
  return this.http.get<Product[]>("http://localhost:5000/products")
}

getProduct(id:number):Observable<Product[]>{
  return this.http.get<Product[]>(`http://localhost:5000/products/:${id}`)
}
}
