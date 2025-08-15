import { Request, Response } from "express";
import {
  convertCurrency,
  getSupportedCurrencies,
} from "../services/exchangeService";
import { conversionSchema } from "../utils/validateCurrency";

export const convert = async (req: Request, res: Response) => {
  const validateData = conversionSchema.parse(req.body);
  const result = await convertCurrency(validateData);

  res.status(200).json(result);
};

export const currencies = async (req: Request, res: Response) => {
  const result = await getSupportedCurrencies();
  res.status(200).json({ currencies: result });
};
