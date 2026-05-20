export interface PaymentFormValues {
  name: string;
  email: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
}

export interface ShippingFormValues {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}
