"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const public_key = fs.readFileSync('public.pem');
const authToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, public_key, { algorithms: ['RS256'] });
        next();
    }
    catch (error) {
        res.status(401).send("access denied!");
    }
};
exports.authToken = authToken;
