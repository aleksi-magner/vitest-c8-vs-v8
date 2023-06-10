import { describe, test, expect } from 'vitest';

import { getColor } from '@/services/helpers';

describe('services/helpers', () => {
  test('getColor', () => {
    expect(getColor(42)).toBe('');
    expect(getColor({})).toBe('');
    expect(getColor(null)).toBe('');
    expect(getColor('')).toBe('');

    expect(getColor('base')).toBe('text-base');
    expect(getColor('secondary')).toBe('text-secondary');
    expect(getColor('muted')).toBe('text-muted');
    expect(getColor('primary')).toBe('text-primary');
    expect(getColor('info')).toBe('text-info');
    expect(getColor('success')).toBe('text-success');
    expect(getColor('warning')).toBe('text-warning');
    expect(getColor('error')).toBe('text-error');
    expect(getColor('priority')).toBe('text-priority');
    expect(getColor('gold')).toBe('text-gold');
    expect(getColor('pink')).toBe('text-pink');
    expect(getColor('white')).toBe('text-white');
    expect(getColor('border')).toBe('text-border');
    expect(getColor('bg')).toBe('text-bg');

    expect(getColor('red')).toBe('text-custom');
    expect(getColor('#fafafa')).toBe('text-custom');
  });
});
