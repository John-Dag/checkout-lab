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
  total: number;
}

export const fakeOrder: CheckoutOrder = {
  orderId: 'ORD-2026-00142',
  merchantLabel: 'Checkout Lab Inc.',
  items: [
    {
      id: 'item-1',
      name: 'Wireless Noise-Cancelling Headphones',
      description: 'Midnight Black · Over-ear',
      quantity: 1,
      unitPrice: 249.99,
    },
    {
      id: 'item-2',
      name: 'USB-C Charging Cable',
      description: '2m · Braided',
      quantity: 2,
      unitPrice: 19.99,
    },
    {
      id: 'item-3',
      name: 'Carrying Case',
      description: 'Hard shell · Compatible with all models',
      quantity: 1,
      unitPrice: 34.99,
    },
  ],
  discount: {
    code: 'SAVE10',
    label: '10% off',
    amount: 32.5,
  },
  shipping: 0,
  tax: 27.24,
  total: 28.5,
};

export const getSubtotal = (items: LineItem[]): number =>
  items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

export const getTotal = (order: CheckoutOrder): number => {
  const subtotal = getSubtotal(order.items);
  const discount = order.discount?.amount ?? 0;
  return subtotal - discount + order.shipping + order.tax;
};
