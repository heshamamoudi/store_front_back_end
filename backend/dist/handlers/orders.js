"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const store = new orders_1.orderStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.index();
        res.json(order);
    }
    catch (error) {
        res.status(400);
        res.json(`invalid token ${error}`);
    }
});
const Show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.show(req.params.id);
        res.json(order);
    }
    catch (error) {
        res.status(400);
        res.json(`invalid token ${error}`);
    }
});
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const order = {
        status: data.status,
        user_id: data.user_id
    };
    try {
        const neworder = yield store.create(order);
        res.json(neworder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const orderId = req.params.id;
    const productId = data.productId;
    const quantity = data.quantity;
    try {
        const addedProduct = yield store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
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
const order_routes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', Show);
    app.post('/order', Create);
    app.post('/orders/:id/products', addProduct);
    // // app.put('/order/:id', put)
    // app.delete('/orders/:id', Delete);
};
exports.default = order_routes;
