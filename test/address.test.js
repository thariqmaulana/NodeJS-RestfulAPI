import supertest from "supertest";
import { createUserTest, createTestContact, removeUserTest, removeAllTestContacts, removeAllTestAddresses, getTestContact, createTestAddress, getTestAddress, createManyTestAddress } from "./test-util.js";
import { web } from "../src/app/web.js";

// describe('POST /api/contacts/:contactId/addresses', () => {
//   beforeEach(async () => {
//     await createUserTest();
//     await createTestContact();
//   });

//   afterEach(async () => {
//     await removeAllTestAddresses();
//     await removeAllTestContacts();
//     await removeUserTest();
//   });

//   it('should can create contact address', async () => {
//     const testContact = await getTestContact()

//     const result = await supertest(web) 
//                    .post(`/api/contacts/${testContact.id}/addresses`)
//                    .set('Authorization', 'test')
//                    .send({
//                     street: 'jalan test',
//                     city: 'kota test',
//                     province: 'provinsi test',
//                     country: 'indonesia',
//                     postal_code: '12345'
//                    });
                   
//     console.info(result.body);
                   
//     expect(result.status).toBe(200);
//     expect(result.body.data.street).toBe('jalan test');
//     expect(result.body.data.id).toBeDefined();

//   });

//   it('should be rejected if request is invalid', async () => {
//     const testContact = await getTestContact()

//     const result = await supertest(web) 
//                    .post(`/api/contacts/${testContact.id}/addresses`)
//                    .set('Authorization', 'test')
//                    .send({
//                     street: 'jalan test',
//                     city: 'kota test',
//                     province: 'provinsi test',
//                     country: '',
//                     postal_code: ''
//                    });
                   
//     console.info(result.body);
                   
//     expect(result.status).toBe(400);
//   });

  
//   it('should be rejected if contact is not found', async () => {
//     const testContact = await getTestContact()

//     const result = await supertest(web) 
//                    .post(`/api/contacts/${testContact.id + 1}/addresses`)
//                    .set('Authorization', 'test')
//                    .send({
//                     street: 'jalan test',
//                     city: 'kota test',
//                     province: 'provinsi test',
//                     country: '',
//                     postal_code: ''
//                    });
                   
//     console.info(result.body);
                   
//     expect(result.status).toBe(404);
//     expect(result.body.errors).toBe('contact is not found');
//   });
// });

// describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
//   beforeEach(async () => {
//     await createUserTest();
//     await createTestContact();
//     await createTestAddress();
//   });

//   afterEach(async () => {
//     await removeAllTestAddresses();
//     await removeAllTestContacts();
//     await removeUserTest();
//   });

//   it('should can get address contact', async () => {
//     const contact = await getTestContact();
//     const address = await getTestAddress();

//     const result = await supertest(web)
//                    .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
//                    .set('Authorization', 'test')

//     console.info(result.body);

//     expect(result.status).toBe(200);
//     expect(result.body.data.id).toBe(address.id);
//     expect(result.body.data.street).toBe('jalan test');
//     expect(result.body.data.city).toBe('kota test');
//     expect(result.body.data.province).toBe('provinsi test');
//     expect(result.body.data.country).toBe('indonesia');
//     expect(result.body.data.postal_code).toBe('12345');

//   });

//   it('should be rejected if contact is not found', async () => {
//     const contact = await getTestContact();
//     const address = await getTestAddress();

//     const result = await supertest(web)
//                    .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
//                    .set('Authorization', 'test')

//     console.info(result.body);

//     expect(result.status).toBe(404);
//     expect(result.body.errors).toBe('contact is not found');
//   });

//   it('should be rejected if address is not found', async () => {
//     const contact = await getTestContact();
//     const address = await getTestAddress();

//     const result = await supertest(web)
//                    .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
//                    .set('Authorization', 'test')

//     console.info(result.body);

//     expect(result.status).toBe(404);
//     expect(result.body.errors).toBe('address is not found');
//   });
// });

// describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
//   beforeEach(async () => {
//     await createUserTest();
//     await createTestContact();
//     await createTestAddress();
//   });

//   afterEach(async () => {
//     await removeAllTestAddresses();
//     await removeAllTestContacts();
//     await removeUserTest();
//   });

//   it('should can update contact address', async () => {
//     const contact = await getTestContact();
//     const address = await getTestAddress();

//     const result = await supertest(web)
//                    .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
//                    .set('Authorization', 'test')
//                    .send({
//                     street: 'jalan ubah test',
//                     city: 'kota ubah test',
//                     province: 'provinsi ubah test',
//                     country: 'indonesia',
//                     postal_code: '12345678'
//                    });

//     console.info(result.body);
//     expect(result.status).toBe(200);
//     expect(result.body.data.id).toBe(address.id);
//     expect(result.body.data.street).toBe('jalan ubah test');
//     expect(result.body.data.city).toBe('kota ubah test');
//     expect(result.body.data.province).toBe('provinsi ubah test');
//     expect(result.body.data.country).toBe(address.country);
//     expect(result.body.data.postal_code).toBe('12345678');
//   });

//   it('should be rejected if mandatory field is empty', async () => {
//     const contact = await getTestContact();
//     const address = await getTestAddress();

//     const result = await supertest(web)
//                    .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
//                    .set('Authorization', 'test')
//                    .send({
//                     street: 'jalan ubah test',
//                     city: 'kota ubah test',
//                     province: 'provinsi ubah test',
//                     country: '',
//                     postal_code: ''
//                    });

//     console.info(result.body);
//     expect(result.status).toBe(400);
//   });

  
//   it('should be rejected if contact is not found', async () => {
//     const contact = await getTestContact();
//     const address = await getTestAddress();

//     const result = await supertest(web)
//                    .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
//                    .set('Authorization', 'test')
//                    .send({
//                     street: 'jalan ubah test',
//                     city: 'kota ubah test',
//                     province: 'provinsi ubah test',
//                     country: 'indonesia',
//                     postal_code: '12345'
//                    });

//     console.info(result.body);
//     expect(result.status).toBe(404);
//     expect(result.body.errors).toBe('contact is not found');
//   });

//   it('should be rejected if address is not found', async () => {
//     const contact = await getTestContact();
//     const address = await getTestAddress();

//     const result = await supertest(web)
//                    .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
//                    .set('Authorization', 'test')
//                    .send({
//                     street: 'jalan ubah test',
//                     city: 'kota ubah test',
//                     province: 'provinsi ubah test',
//                     country: 'indonesia',
//                     postal_code: '12345'
//                    });

//     console.info(result.body);
//     expect(result.status).toBe(404);
//     expect(result.body.errors).toBe('address is not found');
//   });
// });

// describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
//   beforeEach(async () => {
//     await createUserTest();
//     await createTestContact();
//     await createTestAddress();
//   });

//   afterEach(async () => {
//     await removeAllTestAddresses();
//     await removeAllTestContacts();
//     await removeUserTest();
//   });

//   it('should can remove contact', async () => {
//     const contact = await getTestContact();
//     const address = await getTestAddress();

//     const result = await supertest(web)
//                    .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
//                    .set('Authorization', 'test')

//     console.info(result.body);

//     expect(result.status).toBe(200);
//     expect(result.body.data).toBe('OK');
//   });

//   it('should be rejected if contact is not found', async () => {
//     const contact = await getTestContact();
//     const address = await getTestAddress();

//     const result = await supertest(web)
//                    .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
//                    .set('Authorization', 'test')

//     console.info(result.body);

//     expect(result.status).toBe(404);
//     expect(result.body.errors).toBe('contact is not found');
//   });

//   it('should be rejected if address is not found', async () => {
//     const contact = await getTestContact();
//     const address = await getTestAddress();

//     const result = await supertest(web)
//                    .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
//                    .set('Authorization', 'test');

//     console.info(result.body);

//     expect(result.status).toBe(404);
//     expect(result.body.errors).toBe('address is not found');
//   });

//   it('should be can remove contact address', async () => {
//     const contact = await getTestContact();
//     let address = await getTestAddress();

//     const result = await supertest(web)
//                    .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
//                    .set('Authorization', 'test');

//     console.info(result.body);

//     expect(result.status).toBe(200);

//     address = await getTestAddress();
//     expect(address).toBeNull();
//     console.info(address);
//   });
// });

describe('GET /api/contacts/:contactId/addresses', () => {
  beforeEach(async () => {
    await createUserTest();
    await createTestContact();
    await createManyTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeUserTest();
  });

  // it('should can list contact addresses', async () => {
  //   const contact = await getTestContact();

  //   const result = await supertest(web)
  //                  .get(`/api/contacts/${contact.id}/addresses`)
  //                  .set('Authorization', 'test');

  //   console.info(result.body);
  //   expect(result.status).toBe(200);
  //   expect(result.body.data.length).toBe(15);
  // });

  it('should be rejected if contact is not found', async () => {
    const contact = await getTestContact();

    const result = await supertest(web)
                   .get(`/api/contacts/${contact.id + 1}/addresses`)
                   .set('Authorization', 'test');

    console.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBe('contact is not found');
  });
});