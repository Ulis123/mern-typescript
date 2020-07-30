import Joi from "@hapi/joi";
import { NextFunction, Request, Response } from "express";

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .trim()
  .lowercase()
  .required()
  .label("Email");

const username = Joi.string()
  .alphanum()
  .min(2)
  .max(50)
  .trim()
  .required()
  .label("Username");

const name = Joi.string().max(100).trim().required().label("Name");

const password = Joi.string()
  .min(8)
  .max(100)
  .regex(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).*$/)
  .message(
    "must have at least one lowercase letter, one uppercase letter, and one digit."
  )
  .required()
  .label("Password");

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signUpSchema = Joi.object().keys({
    username,
    name,
    email,
    password,
  });

  try {
    await signUpSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signInSchema = Joi.object().keys({
    email,
    password,
  });

  try {
    await signInSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
