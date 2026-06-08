// Validators used by the payment and shipping form hooks.

const STATE_REGEX =
  /^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|DC)$/i;
const ZIP_REGEX = /^\d{5}(-\d{4})?$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateName = (v: string): string | null =>
  v.trim().length < 2 ? 'Name is required' : null;

export const validateEmail = (v: string): string | null =>
  EMAIL_REGEX.test(v) ? null : 'Invalid email address';

export const validateAddress = (v: string): string | null =>
  v.trim().length < 5 ? 'Address is required' : null;

export const validateCity = (v: string): string | null =>
  v.trim().length < 2 ? 'City is required' : null;

export const validateState = (v: string): string | null =>
  STATE_REGEX.test(v.trim()) ? null : 'Invalid state';

export const validateZip = (v: string): string | null => (ZIP_REGEX.test(v) ? null : 'Invalid ZIP');
