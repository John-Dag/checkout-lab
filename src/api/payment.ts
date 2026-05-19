export const createPaymentIntent = async (): Promise<{ clientSecret: string }> => {
  const res = await fetch('/api/create-payment-intent', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to create payment intent');
  return res.json();
};
