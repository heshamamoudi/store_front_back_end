import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user:User=new User()
total:number=0;
  constructor() { }
  
  
  add(user:User,total:number):void{
  this.user=user
  this.total=total
}
getTotal():number{
  return this.total;
}
get():User{
  return this.user;
}
}


