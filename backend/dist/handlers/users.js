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
const user_1 = require("../models/user");
const jwt = require("jsonwebtoken");
const tokenAuth_1 = require("../middleware/tokenAuth");
const fs = require("fs");
const store = new user_1.UserStore();
const private_key = fs.readFileSync('private.pem');
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (error) {
        res.status(400);
        res.json(`invalid token ${error}`);
    }
});
const Show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    const user = {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        password: data.password
    };
    try {
        const newUser = yield store.create(user);
        const token = jwt.sign({ name: newUser.first_name, Lname: newUser.last_name }, private_key, {
            algorithm: 'RS256',
            expiresIn: '2h',
            subject: newUser.id + ''
        });
        res.json({ idToken: token });
    }
    catch (err) {
        res.status(400);
        res.json(err + user);
    }
});
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    const userinput = {
        username: data.username,
        password: data.password
    };
    try {
        const user = yield store.authenticate(userinput);
        const token = jwt.sign({ name: user.first_name, Lname: user.last_name }, private_key, {
            algorithm: 'RS256',
            expiresIn: '2h',
            subject: user.id + ''
        });
        res.json({ idToken: token, name: user.first_name, lname: user.last_name, username: user.username });
    }
    catch (error) {
        res.status(401);
        res.json(error);
    }
});
// const Delete = async (req : express.Request, res: express.Response) =>{
//             const user = await store.delete('1')
//             res.json(user);
//             }
// const Update = async (req : express.Request, res: express.Response) => {
//     let data = req.body;
//     try {
//         const decoded = jwt.verify(data.token,TOKEN_SECRET);
//         if(decoded['user'].id !== parseInt(req.params.id)) {
//             throw new Error('User id does not match!')
//         }
//     } catch(err) {
//         res.status(401)
//         res.json(err + "something accured")
//         return
//     }
//     try {
//         const updated = await store.update(data.first_name,data.last_name,parseInt(req.params.id))
//         res.json(updated)
//     } catch(err) {
//         res.status(400)
//         res.json(err + data.first_name)
//     }
// }
const user_routes = (app) => {
    app.get('/users', tokenAuth_1.authToken, index);
    app.get('/users/:id', tokenAuth_1.authToken, Show);
    app.post('/signin', signin);
    app.post('/signup', Create);
    // app.put('/users/:id', Update)
    // app.delete('/users/:id',Delete)
};
exports.default = user_routes;
