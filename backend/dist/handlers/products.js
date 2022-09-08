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
const products_1 = require("../models/products");
const store = new products_1.productStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const Show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const product = yield store.show(id);
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const Product = {
        name: data.name,
        price: data.price
    };
    try {
        const newProduct = yield store.create(Product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
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
const products_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', Show);
    app.post('/product', Create);
    // app.put('/products/:id', Update)
    // app.delete('/products/:id', Delete);
};
exports.default = products_routes;
