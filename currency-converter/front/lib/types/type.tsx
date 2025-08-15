export type Currency = {
  code: string;
  name: string;
};

export interface Exchange {
  from: string;
  to: string;
  amount?: number;
}

export type CurrencySelectProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  currencies: Currency[];
  id: string;
};
