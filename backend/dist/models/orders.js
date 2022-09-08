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
exports.orderStore = void 0;
const database_1 = require("../database");
class orderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM orders WHERE id = (SELECT MAX(id) FROM orders WHERE status = 'active');`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get orders. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM orders WHERE id=${id};`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get article ${id}. Error: ${err}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
                const result = yield conn.query(sql, [o.status, o.user_id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`unable create order (${o.status}): ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `DELETE FROM orders WHERE id=${id}`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not delete orders ${id}. Error: ${err}`);
            }
        });
    }
    update(status, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `UPDATE orders set status=$1  WHERE id=$2 RETURNING * ;`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [status, id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not update order ${id}. Error: ${err}`);
            }
        });
    }
    addProduct(quants, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            // get order to see if it is open
            try {
                const ordersql = 'SELECT * FROM orders WHERE id=($1);';
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(ordersql, [orderId]);
                const order = result.rows[0];
                if (order.status !== 'active') {
                    throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`);
                }
                conn.release();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
            try {
                const sql = `INSERT INTO  cart(quantity, order_id,product_id) VALUES($1,$2,$3) RETURNING *;`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [quants, orderId, productId]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (error) {
                throw new Error(`Could not add product ${productId} to  order ${orderId}. Error: ${error}`);
            }
        });
    }
}
exports.orderStore = orderStore;
