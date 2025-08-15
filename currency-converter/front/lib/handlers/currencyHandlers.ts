import { getConvert } from "../api/api";

export const handleConvert = async ({
  from,
  to,
  amount,
  setResult,
  setIsLoading,
}: {
  from: string;
  to: string;
  amount: number;
  setResult: React.Dispatch<
    React.SetStateAction<{
      convertedAmount: number;
      rate: number;
    } | null>
  >;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  setResult(null);

  if (!from || !to || !amount || amount <= 0) {
    alert("Please fill all fields correctly.");
    return;
  }

  try {
    setIsLoading(true);
    const data = await getConvert({ from, to, amount });
    setResult({ convertedAmount: data.convertedAmount, rate: data.rate });
  } catch (error) {
    console.error("convert failed");
  }
  setIsLoading(false);
};

export const handleSwapCurrencies = (
  from: string,
  to: string,
  setFrom: React.Dispatch<React.SetStateAction<string>>,
  setTo: React.Dispatch<React.SetStateAction<string>>
) => {
  setFrom((prevFrom) => {
    setTo(prevFrom); // mettre from dans to
    return to; // mettre to dans from
  });
};
