export const createPaymentIntent = async (): Promise<{ clientSecret: string }> => {
  // TODO: replace with real backend call:
  // return fetch('/api/create-payment-intent', { method: 'POST' }).then(r => r.json());
  await new Promise((r) => setTimeout(r, 1500));
  return { clientSecret: 'pi_3TYqfOQhKmS0YlR40lL8mfn1_secret_Sg2URQwmWca5qfCWucKVo4QIR' };
};
