import { useEffect, useState } from "react";
import { getCurrencies } from "../api/api";
import { Currency } from "../types/type";

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getCurrencies()
      .then((data) => {
        setCurrencies(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { currencies, loading, error };
};
