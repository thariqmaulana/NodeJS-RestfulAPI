import { prismaClient } from "../src/app/database.js";
import bcyrpt from "bcrypt";

export const removeUserTest = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: 'test'
    }
  });
}

export const createUserTest = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcyrpt.hash("rahasia", 10),
      name: "test",
      token: "test"
    }
  });
}

export const getTestUsers = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: 'test'
    }
  });
}

export const removeAllTestContacts = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "test"
    }
  });
}

export const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: 'test',
      first_name: 'test1'
    }
  })
}

export const createManyTestContacts = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: `test`,
        first_name: `test${i}`,
        last_name: `test${i}`,
        email: `test${i}@gmail.com`,
        phone: `0800${i}`
      }
    })    
  }
}

export const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: 'test'
    },
  });
}

export const removeAllTestAddresses = async () => {
  await prismaClient.address.deleteMany({
    where: {
      contact:{
        username: 'test'
      }
    }
  })
}

export const createTestAddress = async () => {
  const contact = await getTestContact();
  await prismaClient.address.create({
    data: {
      contact_id: contact.id, 
      street: 'jalan test',
      city: 'kota test',
      province: 'provinsi test',
      country: 'indonesia',
      postal_code: '12345'
    }
  });
}

export const getTestAddress = async () => {
  return prismaClient.address.findFirst({
    where: {
      contact: {   
        username: 'test'
      }
    },
  });
}

export const createManyTestAddress = async () => {
  const contact = await getTestContact();
  for (let i = 0; i < 15; i++) {
    await prismaClient.address.create({
      data: { 
        contact_id: contact.id,
        street: `jalan test ${i}`,
        city: `kota ${i}`,
        province: `provinsi ${i}`,
        country: 'indonesia',
        postal_code: `1234${i}`
      }
    });
  }
}