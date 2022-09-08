import { orderStore } from '../orders';
const store = new orderStore();

describe('Test responses from order model', (): void => {
  // before failing making everything fail with it
  it('creating  order', async (): Promise<void> => {
    const response = await store.create({
      status: 'closed',
      user_id: '1'
    });
    expect(response).toBeDefined();
  });

  it('GET all orders', async (): Promise<void> => {
    const response = await store.index();

    expect(response).toBeDefined();
  });
  it('update order with closed', async (): Promise<void> => {
    const response = await store.update('active', '1');
    expect(response).toEqual({
      id: 1,
      status: 'active',
      user_id: '1'
    });
  });
  it('add to order', async (): Promise<void> => {
    const quants: number = 22;
    const orderId: string = '1';
    const productId: string = '1';
    const response = await store.addProduct(quants, orderId, productId);
    expect(response).toBeDefined();
  });
  
   

    
  });// it('Delete to order', async function ():Promise<void> {
    //     const response = await store.delete("1");
    //     expect(response).toBeTruthy();

    //   }); 

