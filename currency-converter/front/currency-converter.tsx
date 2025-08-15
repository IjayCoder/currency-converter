"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ArrowRightLeft } from "lucide-react";
import { useCurrencies } from "./lib/hooks/hook";
import {
  handleConvert,
  handleSwapCurrencies,
} from "./lib/handlers/currencyHandlers";
import { CurrencySelect } from "./components/CurrencySelect/CurrencySelect";

export default function Component() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const [amount, setAmount] = useState(0);
  const { currencies, loading, error } = useCurrencies();
  const [result, setResult] = useState<null | {
    convertedAmount: number;
    rate: number;
  }>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Currency Converter
          </CardTitle>
          <CardDescription className="text-gray-600">
            Convert between different currencies with real-time rates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="amount"
              className="text-sm font-medium text-gray-700"
            >
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="text-lg"
              min="1"
              step="0.01"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 items-end">
            <CurrencySelect
              label="From"
              value={from}
              onChange={setFrom}
              currencies={currencies}
              id="from-currency"
            />

            <CurrencySelect
              label="To"
              value={to}
              onChange={setTo}
              currencies={currencies}
              id="to-currency"
            />
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSwapCurrencies(from, to, setFrom, setTo)}
              className="rounded-full p-2 h-8 w-8"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={async () =>
              await handleConvert({ from, to, amount, setResult, setIsLoading })
            }
            className="w-full text-lg py-6"
            disabled={
              isLoading ||
              !amount ||
              isNaN(Number(amount)) ||
              Number(amount) <= 0
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              "Convert"
            )}
          </Button>

          {(result || isLoading) && (
            <div className="bg-gray-100 rounded-lg p-4 text-center min-h-[60px] flex items-center justify-center">
              {isLoading ? (
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span> exchange rate...</span>
                </div>
              ) : (
                result && (
                  <div className="text-lg font-semibold text-gray-900">
                    {result.convertedAmount} {to}
                  </div>
                )
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
