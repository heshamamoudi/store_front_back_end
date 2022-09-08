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
const orders_1 = require("../orders");
const store = new orders_1.orderStore();
describe('Test responses from order model', () => {
    // before failing making everything fail with it
    it('creating  order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield store.create({
            status: 'closed',
            user_id: '1'
        });
        expect(response).toBeDefined();
    }));
    it('GET all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield store.index();
        expect(response).toBeDefined();
    }));
    it('update order with closed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield store.update('active', '1');
        expect(response).toEqual({
            id: 1,
            status: 'active',
            user_id: '1'
        });
    }));
    it('add to order', () => __awaiter(void 0, void 0, void 0, function* () {
        const quants = 22;
        const orderId = '1';
        const productId = '1';
        const response = yield store.addProduct(quants, orderId, productId);
        expect(response).toBeDefined();
    }));
}); // it('Delete to order', async function ():Promise<void> {
//     const response = await store.delete("1");
//     expect(response).toBeTruthy();
//   }); 
