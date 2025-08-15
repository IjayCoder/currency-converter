import { Exchange } from "../types/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getConvert = async ({ from, to, amount }: Exchange) => {
  const res = await fetch(`${API_URL}/api/convert`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ from, to, amount }),
  });

  return res.json();
};

export const getCurrencies = async () => {
  const res = await fetch(`${API_URL}/api/currencies`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch currencies");
  }

  const data = await res.json();

  return data.currencies;
};
