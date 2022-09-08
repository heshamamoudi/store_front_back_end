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
exports.UserStore = void 0;
const bcrypt = require("bcrypt");
const database_1 = require("../database");
const { BCRYPT_PASSWORD, SALT_ROUND } = process.env;
class UserStore {
    authenticate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT password,id,first_name,last_name,username FROM users WHERE username=$1;';
            const result = yield conn.query(sql, [user.username]);
            if (result.rows.length) {
                const userOutcome = result.rows[0];
                if (bcrypt.compareSync(user.password + BCRYPT_PASSWORD, userOutcome.password)) {
                    return userOutcome;
                }
            }
            return null;
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users;';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM users WHERE id=$1;`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get article ${id}. Error: ${err}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (first_name,last_name,username, password) VALUES($1, $2,$3,$4) RETURNING *';
                const hash = bcrypt.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUND));
                const result = yield conn.query(sql, [u.first_name, u.last_name, u.username, hash]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`unable create user (${u.username}): ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `DELETE FROM users WHERE id=$1`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not delete users ${id}. Error: ${err}`);
            }
        });
    }
    update(first_name, last_name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `UPDATE users set first_name=$1 , last_name=$2 WHERE id=$3 RETURNING *;`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [first_name, last_name, id]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not delete users ${id}. Error: ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
