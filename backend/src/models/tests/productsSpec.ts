import { productStore } from "../products";
const store = new productStore();

describe('Test responses from product model', (): void => {
  // before failing making everything fail with it
  it("Create Product",async():Promise<void> =>{
    try{
    const response = await store.create({
      name: "horizon",
      price: 4,
    });
    expect(response).toBeTruthy();
    
  } catch (error) {
    throw new Error("failed to create product")
  }
  })


    it('GET all products', async():Promise<void> =>{
        const response =await store.index()

        expect(response).toBeTruthy();
      });

    


      it('update product', async():Promise<void> =>{
      const response = await store.update("gorizon",222,1);
      expect(response).toEqual({
        id:1,
        name: "gorizon",
        price: 222,
        category: null
      });
      
    });

    // it('Delete product', async function ():Promise<void> {
    //     const response = await store.delete(1);
    //     expect(response).toBeTruthy();
        
    //   });
      
      
    });