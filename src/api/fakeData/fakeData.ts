import {
  type LineItem,
  type Discount,
  type CheckoutOrder,
} from '../../types/api/fakeData/FakeDataTypes';

export type { LineItem, Discount, CheckoutOrder };

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
    amount: 32.50,
  },
  shipping: 0,
  subtotal: 304.97,
  tax: 27.24,
  total: 332.21,
};

