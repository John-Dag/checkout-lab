export interface LineItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  imageUrl?: string;
}

export interface Discount {
  code: string;
  label: string;
  amount: number;
}

export interface CheckoutOrder {
  orderId: string;
  merchantLabel: string;
  items: LineItem[];
  discount?: Discount;
  shipping: number;
  tax: number;
  subtotal: number;
  total: number;
}
