import { describe, it, expect } from 'vitest';
import {
  validateName,
  validateEmail,
  validateAddress,
  validateCity,
  validateState,
  validateZip,
} from '../../../src/components/formData/validators';

describe('validateName', () => {
  it('rejects empty input', () => {
    expect(validateName('')).toBe('Name is required');
  });

  it('rejects a single character', () => {
    expect(validateName('A')).toBe('Name is required');
  });

  it('rejects whitespace-only input', () => {
    expect(validateName('   ')).toBe('Name is required');
  });

  it('accepts a real name', () => {
    expect(validateName('Jane')).toBeNull();
  });
});

describe('validateEmail', () => {
  it('rejects empty input', () => {
    expect(validateEmail('')).toBe('Invalid email address');
  });

  it('rejects input without an @', () => {
    expect(validateEmail('janeexample.com')).toBe('Invalid email address');
  });

  it('rejects input without a domain TLD', () => {
    expect(validateEmail('jane@example')).toBe('Invalid email address');
  });

  it('accepts a well-formed address', () => {
    expect(validateEmail('jane@example.com')).toBeNull();
  });
});

describe('validateAddress', () => {
  it('rejects input shorter than 5 characters', () => {
    expect(validateAddress('123')).toBe('Address is required');
  });

  it('accepts a normal street address', () => {
    expect(validateAddress('1600 Amphitheatre Parkway')).toBeNull();
  });
});

describe('validateCity', () => {
  it('rejects a single character', () => {
    expect(validateCity('A')).toBe('City is required');
  });

  it('accepts a city name', () => {
    expect(validateCity('San Francisco')).toBeNull();
  });
});

describe('validateState', () => {
  it('accepts a valid US state abbreviation', () => {
    expect(validateState('CA')).toBeNull();
  });

  it('accepts lowercase (case-insensitive)', () => {
    expect(validateState('ny')).toBeNull();
  });

  it('accepts DC', () => {
    expect(validateState('DC')).toBeNull();
  });

  it('trims surrounding whitespace before matching', () => {
    expect(validateState('  TX  ')).toBeNull();
  });

  it('rejects a non-state two-letter combo', () => {
    expect(validateState('XX')).toBe('Invalid state');
  });

  it('rejects a full state name', () => {
    expect(validateState('California')).toBe('Invalid state');
  });
});

describe('validateZip', () => {
  it('accepts a 5-digit ZIP', () => {
    expect(validateZip('94105')).toBeNull();
  });

  it('accepts a ZIP+4', () => {
    expect(validateZip('94105-1234')).toBeNull();
  });

  it('rejects a ZIP with too few digits', () => {
    expect(validateZip('9410')).toBe('Invalid ZIP');
  });

  it('rejects a ZIP with letters', () => {
    expect(validateZip('9410A')).toBe('Invalid ZIP');
  });

  it('rejects a malformed ZIP+4', () => {
    expect(validateZip('94105-12')).toBe('Invalid ZIP');
  });
});
