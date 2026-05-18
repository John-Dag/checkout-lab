export const createPaymentIntent = async (): Promise<{ clientSecret: string }> => {
  // TODO: replace with real backend call:
  // return fetch('/api/create-payment-intent', { method: 'POST' }).then(r => r.json());
  return { clientSecret: 'pi_xxx_secret_xxx' };
};
