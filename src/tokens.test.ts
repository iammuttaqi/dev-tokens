import { describe, it, expect } from 'vitest';
import { hexToRgb, getContrastRatio, exportCssTokens, exportTypeScriptTokens } from './main.js';

describe('DevTokens Logic', () => {
  it('converts hex strings to RGB accurately', () => {
    const black = hexToRgb('#000000');
    expect(black).toEqual({ r: 0, g: 0, b: 0 });

    const white = hexToRgb('#ffffff');
    expect(white).toEqual({ r: 255, g: 255, b: 255 });

    const custom = hexToRgb('#0f172a');
    expect(custom).toEqual({ r: 15, g: 23, b: 42 });
  });

  it('calculates WCAG contrast ratio correctly', () => {
    const ratio = getContrastRatio('#000000', '#ffffff');
    expect(ratio).toBe(21);

    const same = getContrastRatio('#0f172a', '#0f172a');
    expect(same).toBe(1);
  });

  it('exports valid CSS custom properties', () => {
    const css = exportCssTokens('#0f172a', '#0284c7');
    expect(css).toContain('--color-brand-primary: #0f172a;');
    expect(css).toContain('--color-brand-accent: #0284c7;');
  });

  it('exports valid TypeScript token object', () => {
    const ts = exportTypeScriptTokens('#0f172a', '#0284c7');
    expect(ts).toContain("brandPrimary: '#0f172a'");
    expect(ts).toContain("brandAccent: '#0284c7'");
    expect(ts).toContain('export const tokens = {');
  });
});
