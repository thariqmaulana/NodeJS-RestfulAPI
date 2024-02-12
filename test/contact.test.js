import supertest from "supertest";
import { createManyTestContacts, createTestContact, createUserTest, getTestContact, removeAllTestContacts, removeUserTest } from "./test-util.js";
import { web } from "../src/app/web.js";

describe('POST /api/contacts', () => {
  beforeEach(async () => {
    await createUserTest();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeUserTest();
  });

  it('should can create new contact', async () => {
    const result = await supertest(web)
                   .post('/api/contacts')
                   .set('Authorization', 'test')
                   .send({
                    first_name: 'Thariq',
                    last_name: 'Maulana',
                    email: 'thariq@gmail.com',
                    phone: '080011552200'
                   });
        
    console.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe('Thariq');
    expect(result.body.data.last_name).toBe('Maulana');
    expect(result.body.data.email).toBe('thariq@gmail.com');
    expect(result.body.data.phone).toBe('080011552200');
  });

  it('should be rejected if request is invalid', async () => {
    const result = await supertest(web)
                   .post('/api/contacts')
                   .set('Authorization', 'test')
                   .send({
                    first_name: '',
                    last_name: 'Maulana',
                    email: 'thariq@gmail.com',
                    phone: '08001155220012122121212112'
                   });
        
    console.info(result.body);

    expect(result.status).toBe(400);
    expect(result.status).toBeDefined();
  });
});

describe('GET /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createUserTest();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeUserTest();
  });

  it('should can get contact', async () => {
    const testContact = await getTestContact();
    console.info(testContact);

    const result = await supertest(web)
                   .get(`/api/contacts/${testContact.id}`)
                   .set('Authorization', 'test');

    console.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe(testContact.first_name);
                   
  });

  it('should return 404 if contact id is not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
                   .get(`/api/contacts/${testContact.id + 1}`)
                   .set('Authorization', 'test');

    console.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe('Contact is not found');
                  
  });
});

describe('PUT /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createUserTest();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeUserTest();
  });

  it('should can update contact', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
                   .put(`/api/contacts/${testContact.id}`)
                   .set('Authorization', 'test')
                   .send({
                    first_name: 'thariq',
                    last_name: 'maulana',
                    email: 'thariq@gmail.com',
                    phone: '080033221100'
                   });
    
    console.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.first_name).toBe('thariq');
    expect(result.body.data.last_name).toBe('maulana');
    expect(result.body.data.email).toBe('thariq@gmail.com');
    expect(result.body.data.phone).toBe('080033221100');
  });

  it('should be rejected if request is invalid', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
                   .put(`/api/contacts/${testContact.id}`)
                   .set('Authorization', 'test')
                   .send({
                    first_name: '',
                    last_name: 'maulana',
                    email: 'bukanemail',
                    phone: '080033221100'
                   });
    
    console.info(result.body);

    expect(result.status).toBe(400);
  });

  it('should be rejected if contact is not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
                   .put(`/api/contacts/${testContact.id + 1}`)
                   .set('Authorization', 'test')
                   .send({
                    first_name: 'thariq',
                    last_name: 'maulana',
                    email: 'thariq@gmail.com',
                    phone: '080033221100'
                   });
    
    console.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe('contact is not found');
  });
});

describe('DELETE /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createUserTest();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeUserTest();
  });

  it('should can remove contact', async () => {
    let testContact = await getTestContact();
    
    const result = await supertest(web)
                   .delete(`/api/contacts/${testContact.id}`)
                   .set('Authorization', 'test');
    
    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');

    testContact = await getTestContact();
    console.info(testContact);
    expect(testContact).toBeNull();
  });

  it('should be rejected if token is invalid', async () => {
    let testContact = await getTestContact();
    
    const result = await supertest(web)
                   .delete(`/api/contacts/${testContact.id}`)
                   .set('Authorization', 'salah');
    
    expect(result.status).toBe(401);
  });

  it('should be rejected if contact is not found', async () => {
    let testContact = await getTestContact();
    
    const result = await supertest(web)
                   .delete(`/api/contacts/${testContact.id + 1}`)
                   .set('Authorization', 'test');
    
    expect(result.status).toBe(404);
    expect(result.body.errors).toBe('contact is not found');
  });
});

describe('GET /api/contacts', () => {
  beforeEach(async () => {
    await createUserTest();
    await createManyTestContacts();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeUserTest();
  });

  it('should can search contact without parameter', async () => {
    const result = await supertest(web)
                   .get('/api/contacts')
                   .set('Authorization', 'test')

    console.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it('should can search to page 2', async () => {
    const result = await supertest(web)
                   .get('/api/contacts')
                   .query({
                    page: 2
                   })
                   .set('Authorization', 'test');

    console.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it('should can search by name', async () => {
    const result = await supertest(web)
                   .get('/api/contacts')
                   .query({
                    name: "test1"
                   })
                   .set('Authorization', 'test');

    console.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it('should can search by email', async () => {
    const result = await supertest(web)
                   .get('/api/contacts')
                   .query({
                    email: "test1@gmail.com"
                   })
                   .set('Authorization', 'test');

    console.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
    expect(result.body.data[0].email).toBe('test1@gmail.com');
  });

  it('should can search by phone', async () => {
    const result = await supertest(web)
                   .get('/api/contacts')
                   .query({
                    phone: "08001"
                   })
                   .set('Authorization', 'test');

    console.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
  });
});