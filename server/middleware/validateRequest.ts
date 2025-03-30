import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const baseSchema = (overrides: yup.AnyObject) =>
  yup.object({
    body: yup.object(),
    params: yup.object(),
    query: yup.object(),
    ...overrides,
  });

async function validateRequest(schema: yup.AnySchema, requestFields: any) {
  return await schema.validate(requestFields, {
    abortEarly: true,
  });
}

const validateMiddleware = (schema: yup.AnySchema) => async (req: Request, _res: Response, next: NextFunction) => {
  await validateRequest(schema, {
    body: req.body,
    params: req.params,
    query: req.query,
  });

  next();

};

export default validateMiddleware;
