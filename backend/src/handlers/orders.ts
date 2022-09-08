import * as express from 'express';
import { orderStore, order } from '../models/orders';
import { authToken } from '../middleware/tokenAuth';

const store = new orderStore();

const index = async (req: express.Request, res: express.Response) => {
  try {
    const order = await store.index();
  res.json(order);
  } catch (error) {
    res.status(400);
    res.json(`invalid token ${error}`);
  }
  
};

const Show = async (req: express.Request, res: express.Response) => {
  
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(`invalid token ${error}`);
  }
  
};

const Create = async (req: express.Request, res: express.Response) => {
  const data = req.body;
  const order: order = {
    status: data.status,
    user_id: data.user_id
  };
  try {
    const neworder = await store.create(order);
    res.json(neworder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: express.Request, res: express.Response) => {
  const data = req.body;
  const orderId: string = req.params.id;
  const productId: string = data.productId;
  const quantity: number = data.quantity;
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// const Delete = async (req: express.Request, res: express.Response) => {
//   let data = req.body;
//   try {
//     jwt.verify(data.token, TOKEN_SECRET);
//   } catch (error) {
//     res.status(401);
//     res.json(`invalid token ${error}`);
//     return;
//   }
//   const order = await store.delete(req.params.id);
//   res.json(order);
// };

const order_routes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', Show);
  app.post('/order', Create);
  app.post('/orders/:id/products', addProduct);
  // // app.put('/order/:id', put)
  // app.delete('/orders/:id', Delete);
};

export default order_routes;
