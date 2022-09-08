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
const user_1 = require("../user");
const store = new user_1.UserStore();
let user;
describe('Test responses from user model', () => {
    // before failing making everything fail with it
    it("", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield store.create({
                first_name: 'hesham',
                last_name: 'amoudi',
                username: 'amoudi',
                password: 'h123'
            });
            user = response;
        }
        catch (error) {
            throw new Error("failed to create user");
        }
    }));
    it('GET all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield store.index();
        expect(response).toBeTruthy();
    }));
    it('update user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield store.update(user.first_name, "hosni", user.id);
        expect(response).toEqual({
            id: user.id,
            first_name: 'hesham',
            last_name: 'hosni',
            username: 'amoudi',
            password: user.password
        });
    }));
    // it('Delete user', async function ():Promise<void> {
    //     const response = await store.delete("1");
    //     expect(response).toBeTruthy();
    //   });
});
