import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { createContactValidation, getContactValidation, searchContactValidation, updateContactValidation } from "../validation/contact-validation.js"
import { getUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js"


const create = async (user, request) => {
  const contact = validate(createContactValidation, request);
  contact.username = user.username;

  const createContact = await prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true
    }
  });

  return createContact;
}

const get = async (user, contactId) => {
   contactId = validate(getContactValidation, contactId);

   const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true
    }
   });
   console.info(contact);

   if (!contact) {
    throw new ResponseError(404, "Contact is not found")
   }
   
   return contact;
}

const update = async (user, request) => {
  const contact = validate(updateContactValidation, request);
  // contactId = validate(getContactValidation, contactId);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      id: contact.id,
      username: user.username
    }
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }



  const updateContact = await prismaClient.contact.update({
    where: {
      id: contact.id
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true
    }
  });

  return updateContact;
}

const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      id: contactId,
      username: user.username
    }
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  const deleteContact = await prismaClient.contact.delete({
    where: {
      id: contactId
    }
  });

  return;
}

const search = async (user, request) => {
  request = validate(searchContactValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username
  });

  if (request.name) {
    filters.push({
      OR: [
        {
          first_name: {
            contains: request.name
          }
        },
        {
          last_name: {
            contains: request.name
          }
        }
      ]
    });
  }
  if (request.email) {
    filters.push({
      email: {
        contains: request.email
      }
    });
  }
  if (request.phone) {
    filters.push({
      phone: {
        contains: request.phone
      }
    });
  }

  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filters
    },
    take: request.size,
    skip: skip
  });

  const totalItems  = await prismaClient.contact.count({
    where: {
      AND: filters
    }
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      total_page: Math.ceil(totalItems / request.size),
      total_item: totalItems
    }
  }
}

  export default {
    create,
    get,
    update,
    remove,
    search,
  }