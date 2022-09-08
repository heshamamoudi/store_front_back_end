import * as bcrypt from 'bcrypt';
import client from '../database';

export type User = {
  id?: number;
  first_name?: string;
  last_name?: string;
  username: string;
  password: string;
};
const { BCRYPT_PASSWORD, SALT_ROUND } = process.env;

export class UserStore {

  async authenticate(user:User): Promise<User | null> {
    const conn = await client.connect();
    const sql = 'SELECT password,id,first_name,last_name,username FROM users WHERE username=$1;';

    const result = await conn.query(sql, [user.username]);


    if (result.rows.length) {
      const userOutcome:User = result.rows[0];
      if (bcrypt.compareSync(user.password + BCRYPT_PASSWORD, userOutcome.password)) {
        return userOutcome;
      }
    }

    return null;
  }

  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users;';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = `SELECT * FROM users WHERE id=$1;`;
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get article ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (first_name,last_name,username, password) VALUES($1, $2,$3,$4) RETURNING *';

      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUND)
      );

      const result = await conn.query(sql, [u.first_name,u.last_name,u.username, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = `DELETE FROM users WHERE id=$1`;
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete users ${id}. Error: ${err}`);
    }
  }
  async update(
    first_name: string,
    last_name: string,
    id: number
  ): Promise<User> {
    try {
      const sql = `UPDATE users set first_name=$1 , last_name=$2 WHERE id=$3 RETURNING *;`;
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [first_name, last_name, id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete users ${id}. Error: ${err}`);
    }
  }
}
