import * as supertest from 'supertest';
import app from '../../server'

const request = supertest(app);

import * as dotenv from 'dotenv';
dotenv.config();
const {
    TEST_TOKEN
} = process.env;


describe('Test responses from User endpoints', (): void => {
  
    it('Create user', async function ():Promise<void> {
        try {
          const response: supertest.Response = await request.post('/signup').send({
              first_name: 'hesham',
              last_name: 'endpoint',
              username:"heshamEndpoint",
              password: 'helloworld123',
            });
            
          expect(response.status).toBe(200);
        } catch (error) {
            Promise.reject("Error accured")
        }
      
      
      
    });
    
    it('GET all users', async function ():Promise<void> {
        const response: supertest.Response = await request.get('/users').set('Authorization', 'Bearer ' + TEST_TOKEN);
        expect(response.status).toBe(200);
      });

      it('GET 1 user', async function ():Promise<void> {
        const response: supertest.Response = await request.get('/users/1').set('Authorization', 'Bearer ' + TEST_TOKEN);
        expect(response.status).toBe(200);
      });

      it('Sign in', async function ():Promise<void> {
        const response: supertest.Response = await request.post('/users/signin').send({
              username:"heshamamoudi",
              password: 'helloworld123',
        });
        expect(response.status).toBe(200);
      });
    });

 


describe('Test responses from product endpoints', (): void => {
  
  it('Create product', async function ():Promise<void> {
      try {
        const response: supertest.Response = await request.post('/product').send({
          name: "horizon",
          price: 4,
        }).set('Authorization', 'Bearer ' + TEST_TOKEN);
        expect(response.status).toBe(200);
      } catch (error) {
          Promise.reject(new Error("Couldn't Create Product "))
      }
    
     
    
  });
  
  it('GET all products', async function ():Promise<void> {
      const response: supertest.Response = await request.get('/products')
      expect(response.status).toBe(200);
    });

    it('GET 1 product', async function ():Promise<void> {
      const response: supertest.Response = await request.get('/products/1')
      expect(response.status).toBe(200);
    });

  });


// NEED HELP in this
  describe('Test responses from order endpoints', (): void => {

    it('Create order', async function ():Promise<void> {
        try {
          const response: supertest.Response = await request.post('/order').send({
            status: "active",
            user_id: '1',
          }).set('Authorization', 'Bearer ' + TEST_TOKEN);
          
            
          expect(response.status).toBe(200);
        } catch (error) {
            Promise.reject("Error accured")
        }
      
      
      
    });
    
    it('GET current order', async function ():Promise<void> {
        const response: supertest.Response = await request.get('/orders').set('Authorization', 'Bearer ' + TEST_TOKEN);
        expect(response.status).toBe(200);
      });


      // NEED HELP in this
      it('add product to order', async function ():Promise<void> {
        const response: supertest.Response = await request.post('/orders/1/products').send({
           productId: "1",
           quantity:22
        }).set('Authorization', 'Bearer ' + TEST_TOKEN);
        expect(response.status).toBe(200);
      });
});

      


