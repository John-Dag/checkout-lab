import { describe, it, expect } from 'vitest';
import { detectCardType } from '../../../src/utils/validation/detectCardType';

describe('detectCardType', () => {
  it('returns null for an empty input', () => {
    expect(detectCardType('')).toBeNull();
  });

  it('returns null for non-digit garbage', () => {
    expect(detectCardType('abc')).toBeNull();
  });

  it('detects Visa from the leading 4', () => {
    expect(detectCardType('4242 4242 4242 4242')).toBe('visa');
  });

  it('detects Mastercard from the 5x range', () => {
    expect(detectCardType('5555 5555 5555 4444')).toBe('mastercard');
  });

  it('detects Mastercard from the 2-series range (post-2017 BINs)', () => {
    expect(detectCardType('2221 0000 0000 0009')).toBe('mastercard');
  });

  it('detects Amex from the 34/37 prefix', () => {
    expect(detectCardType('3782 822463 10005')).toBe('amex');
  });

  it('detects Discover from the 6011 prefix', () => {
    expect(detectCardType('6011 1111 1111 1117')).toBe('discover');
  });

  it('returns null for a prefix that matches no known network', () => {
    expect(detectCardType('1234 5678 9012 3456')).toBeNull();
  });

  it('strips spaces and dashes before matching', () => {
    expect(detectCardType('4242-4242-4242-4242')).toBe('visa');
  });
});
