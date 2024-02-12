import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt";
import {v4 as uuid} from 'uuid';

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username
    }
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username name is already exists");
  } 

  user.password = await bcrypt.hash(user.password, 10);

  const result = await prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true
    }
  })

  return result;
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username
    },
    select: {
      username: true,
      password: true
    }
  });

  if (!user) {
    throw new ResponseError(401, "Invalid Username or Password");
  }

  const isValidPass = await bcrypt.compare(loginRequest.password, user.password);

  if (!isValidPass) {
    throw new ResponseError(401, "Invalid Username or Password");
  }

  const token = uuid().toString();
  const result = await prismaClient.user.update({
    data: {
      token: token
    },
    where: {
      username: user.username
    },
    select: {
      token: true
    }
  });

  return result;
};

const get = async (username) => {
  username = validate(getUserValidation, username);
  
  const user = await prismaClient.user.findUnique({
    where: {
      username: username
    },
    select: {
      username: true,
      name: true
    }
  });

  if (!user) {
    throw new ResponseError(404, "User is Not Found");
  }

  return user;
}

const update = async (request) => {
  const updateRequest = validate(updateUserValidation, request);

  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      username: updateRequest.username 
    }
  });

  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "User is Not Found")
  }

  const data = {};
  if (updateRequest.name) {
    data.name = updateRequest.name;
  }
  if (updateRequest.password) {
    data.password = await bcrypt.hash(updateRequest.password, 10);
  } 

  const updateUser =  prismaClient.user.update({
    where: {
      username: updateRequest.username
    },
    data: data,
    select: {
      username: true,
      name: true
    }
  });

  return updateUser;
}

const logout = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username
    }
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  const deleteToken = await prismaClient.user.update({
    where: {
      username: username
    },
    data: {
      token: null
    },
    select: false
  });

  return deleteToken;
}

export default {register, login, get, update, logout};