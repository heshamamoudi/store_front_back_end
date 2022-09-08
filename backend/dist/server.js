"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const users_1 = require("./handlers/users");
const orders_1 = require("./handlers/orders");
const products_1 = require("./handlers/products");
const app = express();
const address = 'localhost:5000';
app.use(cors({
    origin: "*"
}));
app.use('/images', express.static('images'));
app.use(bodyParser.json());
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
app.listen(5000, function () {
    console.log(`starting app on: http://${address}`);
});
exports.default = app;
