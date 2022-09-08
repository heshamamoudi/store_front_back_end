
import client from '../database';

export type order = {
  id?: number;
  status: string;
  user_id: string;
  product_ids?:number[]
};

export class orderStore {
  async index(): Promise<order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE id = (SELECT MAX(id) FROM orders WHERE status = 'active');`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<order> {
    try {
      const sql = `SELECT * FROM orders WHERE id=${id};`;
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get article ${id}. Error: ${err}`);
    }
  }

  async create(o: order): Promise<order> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';

      const result = await conn.query(sql, [o.status, o.user_id]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`unable create order (${o.status}): ${err}`);
    }
  }

  async delete(id: string): Promise<order> {
    try {
      const sql = `DELETE FROM orders WHERE id=${id}`;
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete orders ${id}. Error: ${err}`);
    }
  }
  async update(status: string, id: string): Promise<order> {
    try {
      const sql = `UPDATE orders set status=$1  WHERE id=$2 RETURNING * ;`;
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [status, id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not update order ${id}. Error: ${err}`);
    }
  }

  async addProduct(
    quants: number,
    orderId: string,
    productId: string
  ): Promise<order> {
    // get order to see if it is open
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1);';
      //@ts-ignore
      const conn = await client.connect();

      const result = await conn.query(ordersql, [orderId]);

      const order = result.rows[0];
      if (order.status !== 'active') {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }
    try {
      const sql = `INSERT INTO  cart(quantity, order_id,product_id) VALUES($1,$2,$3) RETURNING *;`;
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [quants, orderId, productId]);

      const order = result.rows[0];

      conn.release();
      return order;
    } catch (error) {
      throw new Error(
        `Could not add product ${productId} to  order ${orderId}. Error: ${error}`
      );
    }
  }
}
