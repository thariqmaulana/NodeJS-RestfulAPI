import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address-validation.js"
import { getContactValidation, updateContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js"


const create = async (user, contactId, request) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId
    }
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found")
  }

  request = validate(createAddressValidation, request);
  request.contact_id = contactId;

  const address = await prismaClient.address.create({
    data: request,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true
    }  
  });

  return address;
}

const get = async (user, contactId, addressId) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId
    }
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, 'contact is not found');
  }

  addressId = validate(getAddressValidation, addressId);

  // const totalAddressInDatabase = await prismaClient.address.count({
  //   where: {
  //     contact_id: contactId,
  //     id: addressId
  //   }
  // });

  const getAddress = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true
    }
  });

  if (!getAddress) {
    throw new ResponseError(404, 'address is not found');
  }

  return getAddress;

}

const update = async (user, contactId, request) => {
  contactId = validate(getContactValidation, contactId);
  
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId
    }
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, 'contact is not found');
  }

  const address = validate(updateAddressValidation, request);
  
  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: address.id
    }
  });

  if (totalAddressInDatabase !== 1) {
    throw new ResponseError(404, 'address is not found');
  }

  const updateAddress = await prismaClient.address.update({
    where: {
      id: address.id
    },
    data: {
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true
    }
  });

  return updateAddress;
}

const remove = async (user, contactId, addressId) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId
    }
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, 'contact is not found');
  }

  addressId = validate(getAddressValidation, addressId);

  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: addressId
    }
  });

  if (totalAddressInDatabase !== 1) {
    throw new ResponseError(404, 'address is not found');
  }

  await prismaClient.address.delete({
    where: {
      id: addressId
    }
  });

  return;

}

const list = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId
    }
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, 'contact is not found');
  }

  const addressList = await prismaClient.address.findMany({
    where: {
      contact_id: contactId
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true
    }
  });

  return addressList;
}

export default {
  create,
  get,
  update,
  remove,
  list
}