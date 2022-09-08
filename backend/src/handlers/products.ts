import * as express from 'express';
import { product, productStore } from '../models/products';
import { authToken } from '../middleware/tokenAuth';

const store = new productStore();

const index = async (req: express.Request, res: express.Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
 
};

const Show = async (req: express.Request, res: express.Response) => {
  try{
 const id: number = parseInt(req.params.id);
  const product = await store.show(id);
  res.json(product);
  }catch (error) {
    res.status(400);
    res.json(error);
  }
 
};

const Create = async (req: express.Request, res: express.Response) => {
  const data = req.body;
  const Product: product = {
    name: data.name,
    price: data.price
  };
  try {
    const newProduct = await store.create(Product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// const Delete = async (req: express.Request, res: express.Response) => {
//   try {
//     const id:number = parseInt(req.params.id)
//     const Product = await store.delete(id);
//     res.json(Product);
//   } catch (error) {
//     res.status(400);
//     res.json(`error: ${error}`);
//   }
// };
// const Update = async (req: express.Request, res: express.Response) => {
//   const data= req.body;
//   const name:string = data.name;
//   const price:number =parseInt(data.price);
//   const id:number = parseInt(req.params.id);
//   try {
//     const Product = await store.update(name, price,id);
//     res.json(Product);
//   } catch (error) {
//     res.status(400);
//     res.json(`error: ${error}`);
//   }
// };

const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', Show);
  app.post('/product', Create);
  // app.put('/products/:id', Update)
  // app.delete('/products/:id', Delete);
};

export default products_routes;
