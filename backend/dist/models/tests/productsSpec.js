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
const products_1 = require("../products");
const store = new products_1.productStore();
describe('Test responses from product model', () => {
    // before failing making everything fail with it
    it("Create Product", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield store.create({
                name: "horizon",
                price: 4,
            });
            expect(response).toBeTruthy();
        }
        catch (error) {
            throw new Error("failed to create product");
        }
    }));
    it('GET all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield store.index();
        expect(response).toBeTruthy();
    }));
    it('update product', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield store.update("gorizon", 222, 1);
        expect(response).toEqual({
            id: 1,
            name: "gorizon",
            price: 222,
            category: null
        });
    }));
    // it('Delete product', async function ():Promise<void> {
    //     const response = await store.delete(1);
    //     expect(response).toBeTruthy();
    //   });
});
