export type Expense = {
  id: string;
  item: string;
  price: number;
  memo?: string;
};

export type ExpenseError = {
  item?: boolean;
  price?: boolean;
};

export type period = "daily" | "weekly" | "monthly";
