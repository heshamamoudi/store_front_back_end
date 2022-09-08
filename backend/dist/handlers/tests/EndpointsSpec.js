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
const supertest = require("supertest");
const server_1 = require("../../server");
const request = supertest(server_1.default);
const dotenv = require("dotenv");
dotenv.config();
const { TEST_TOKEN } = process.env;
describe('Test responses from User endpoints', () => {
    it('Create user', function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield request.post('/signup').send({
                    first_name: 'hesham',
                    last_name: 'endpoint',
                    username: "heshamEndpoint",
                    password: 'helloworld123',
                });
                expect(response.status).toBe(200);
            }
            catch (error) {
                Promise.reject("Error accured");
            }
        });
    });
    it('GET all users', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.get('/users').set('Authorization', 'Bearer ' + TEST_TOKEN);
            expect(response.status).toBe(200);
        });
    });
    it('GET 1 user', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.get('/users/1').set('Authorization', 'Bearer ' + TEST_TOKEN);
            expect(response.status).toBe(200);
        });
    });
    it('Sign in', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.post('/users/signin').send({
                username: "heshamamoudi",
                password: 'helloworld123',
            });
            expect(response.status).toBe(200);
        });
    });
});
describe('Test responses from product endpoints', () => {
    it('Create product', function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield request.post('/product').send({
                    name: "horizon",
                    price: 4,
                }).set('Authorization', 'Bearer ' + TEST_TOKEN);
                expect(response.status).toBe(200);
            }
            catch (error) {
                Promise.reject(new Error("Couldn't Create Product "));
            }
        });
    });
    it('GET all products', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.get('/products');
            expect(response.status).toBe(200);
        });
    });
    it('GET 1 product', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.get('/products/1');
            expect(response.status).toBe(200);
        });
    });
});
// NEED HELP in this
describe('Test responses from order endpoints', () => {
    it('Create order', function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield request.post('/order').send({
                    status: "active",
                    user_id: '1',
                }).set('Authorization', 'Bearer ' + TEST_TOKEN);
                expect(response.status).toBe(200);
            }
            catch (error) {
                Promise.reject("Error accured");
            }
        });
    });
    it('GET current order', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.get('/orders').set('Authorization', 'Bearer ' + TEST_TOKEN);
            expect(response.status).toBe(200);
        });
    });
    // NEED HELP in this
    it('add product to order', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.post('/orders/1/products').send({
                productId: "1",
                quantity: 22
            }).set('Authorization', 'Bearer ' + TEST_TOKEN);
            expect(response.status).toBe(200);
        });
    });
});
