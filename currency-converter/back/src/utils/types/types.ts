export interface Exchange {
  from: string;
  to: string;
  amount?: number;
}

export type Currency = {
  code: string;
  name: string;
};
