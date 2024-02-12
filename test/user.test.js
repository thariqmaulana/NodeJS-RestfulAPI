import { logger } from "../src/app/logging.js";
import { web } from "../src/app/web.js";
import supertest from "supertest"
import { createUserTest, getTestUsers, removeUserTest } from "./test-util.js";
import bcrypt from "bcrypt"

  describe('POST /api/users', () => {``

    afterEach( async () => {
      await removeUserTest()     
    })

    it('should can register new user', async () => {

      const result = await supertest(web).post('/api/users')
                      .send({
                        username: 'test',
                        password: 'rahasia',
                        name: 'test'
                      });
                      
      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe("test");
      expect(result.body.data.name).toBe("test");
      expect(result.body.data.password).toBeUndefined();
    });

    it('should be rejected if request is invalid', async () => {

      const result = await supertest(web).post('/api/users')
                      .send({
                        username: '',
                        password: '',
                        name: ''
                      });

      logger.info(result.body);
      logger.info(result.body.errors);
                      
      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });

    
    it('should cannot register new user with same data', async () => {

      let result = await supertest(web).post('/api/users')
                      .send({
                        username: 'test',
                        password: 'rahasia',
                        name: 'test'
                      });
                      
      result = await supertest(web).post('/api/users')
                      .send({
                        username: 'test',
                        password: 'rahasia',
                        name: 'test'
                      });

      logger.info(result.body);
                      
      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      await createUserTest();
    });
    
    afterEach(async () => {
      await removeUserTest();
    });

    it('should can login', async () => {
      const result = await supertest(web)
                .post('/api/users/login')
                .send({
                  username: 'test',
                  password: 'rahasia'
                })

    console.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe('test');
    });

    it('should be rejected when username or pass is empty', async () => {
      const result = await supertest(web)
                .post('/api/users/login')
                .send({
                  username: '',
                  password: ''
                })

    console.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
    });

    it('should be rejected when password invalid', async () => {
      const result = await supertest(web)
                .post('/api/users/login')
                .send({
                  username: 'test',
                  password: 'salah'
                })

    console.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
    });

    it('should be rejected when username invalid', async () => {
      const result = await supertest(web)
                .post('/api/users/login')
                .send({
                  username: 'salah',
                  password: 'salah'
                })

    console.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
    });
  });

describe('GET /api/users/current', () => {
  beforeEach(async () => {
    await createUserTest();
  });
  
  afterEach(async () => {
    await removeUserTest();
  });

  it('should can get current user', async () => {
    const result = await supertest(web)
                   .get('/api/users/current')
                   .set('Authorization', 'test');
    
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
  });

  it('should be rejected if token is invalid', async () => {
    const result = await supertest(web)
                   .get('/api/users/current')
                   .set('Authorization', 'salah');
    
    expect(result.status).toBe(401);
    expect(result.body.errors).toBe('Unauthorized');
  });
});

  describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
      await createUserTest();
    });
    
    afterEach(async () => {
      await removeUserTest();
    });

    it('should can update current user', async () => {
      const result = await supertest(web)
                     .patch('/api/users/current')
                     .set('Authorization', 'test')
                     .send({
                      name: 'thariq',
                      password: 'thariq123'
                     });

      console.info(result.body)
                   
      expect(result.status).toBe(200);
      expect(result.body.data.name).toBe('thariq');
      
      const user = await getTestUsers();
      expect(await bcrypt.compare('thariq123', user.password)).toBe(true);
   });

   it('should be rejected update user', async () => {
    const result = await supertest(web)
                   .patch('/api/users/current')
                   .set('Authorization', 'salah')
                   .send({
                    name: 'thariq',
                    password: 'thariq123'
                   });
                 
    expect(result.status).toBe(401);
    expect(result.body.errors).toBe('Unauthorized');
 });
});

describe('DELETE /api/users/logout', () => {
  beforeEach(async () => {
    await createUserTest();
  });

  afterEach(async () => {
    await removeUserTest();
  });

  it('should can logout', async () => {
    const result = await supertest(web)
                   .delete('/api/users/logout')
                   .set('Authorization', 'test');

     expect(result.status).toBe(200);
     expect(result.body.data).toBe('OK');

     const user = await getTestUsers();

     console.info(user)
     expect(user.token).toBeNull();
  });

  it('should be rejected logout if token is invalid', async () => {
    const result = await supertest(web)
                   .delete('/api/users/logout')
                   .set('Authorization', 'salah');

     expect(result.status).toBe(401);
     expect(result.body.errors).toBe('Unauthorized');
  });
});



