import axios from "axios";
import dotenv from "dotenv";
import { Currency, Exchange } from "../utils/types/types";
dotenv.config();

export const API_BASE = process.env.EXCHANGE_API_BASE;
const API_KEY = process.env.EXCHANGE_API_KEY;

export const convertCurrency = async ({ from, to, amount }: Exchange) => {
  try {
    const res = await axios.get(`${API_BASE}/convert`, {
      params: {
        access_key: API_KEY,
        from,
        to,
        amount,
      },
      timeout: 5000,
    });

    const data = res.data;
    if (
      data.success !== true ||
      typeof data.result !== "number" ||
      typeof data.info?.quote !== "number"
    ) {
      throw new Error("conversion failed");
    }

    return {
      from,
      to,
      amount,
      convertedAmount: data.result,
      rate: data.info.quote,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("🔴 API Error response:", error.response?.data);
    } else {
      console.error("🔴 General Error:", error);
    }
    throw new Error("Error occurs when converting");
  }
};

export const getSupportedCurrencies = async (): Promise<Currency[]> => {
  try {
    const res = await axios.get(`${API_BASE}/list`, {
      params: {
        access_key: API_KEY,
      },
      timeout: 5000,
    });
    const data = res.data;

    if (!data.currencies || typeof data.currencies !== "object") {
      throw new Error("Invalid symbols data received");
    }

    const currencyList = Object.entries(data.currencies).map(
      ([code, name]) => ({
        code,
        name: name as string, // 👈 important si TS infère `unknown`
      })
    );
    return currencyList;
  } catch (error) {
    throw new Error("An error occurs while getting the supported currency ");
  }
};
