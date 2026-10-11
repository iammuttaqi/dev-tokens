export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  if (clean.length === 3) {
    const r = parseInt(clean[0]! + clean[0]!, 16);
    const g = parseInt(clean[1]! + clean[1]!, 16);
    const b = parseInt(clean[2]! + clean[2]!, 16);
    return { r, g, b };
  }
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    const norm = v / 255;
    return norm <= 0.03928 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0]! + 0.7152 * a[1]! + 0.0722 * a[2]!;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

export function exportCssTokens(primary: string, accent: string): string {
  return `:root {
  --color-brand-primary: ${primary};
  --color-brand-accent: ${accent};
  --color-surface-bg: #f8fafc;
  --color-surface-card: #ffffff;
  --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --spacing-unit: 4px;
}`;
}

export function exportTypeScriptTokens(primary: string, accent: string): string {
  return `export const tokens = {
  colors: {
    brandPrimary: '${primary}',
    brandAccent: '${accent}',
    surfaceBg: '#f8fafc',
    surfaceCard: '#ffffff',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  spacing: {
    unit: 4,
  },
} as const;

export type Tokens = typeof tokens;`;
}

// Client DOM binding
if (typeof document !== 'undefined') {
  const inputPrimary = document.getElementById('input-primary-color') as HTMLInputElement | null;
  const textPrimary = document.getElementById('text-primary-color') as HTMLInputElement | null;
  const inputAccent = document.getElementById('input-accent-color') as HTMLInputElement | null;
  const textAccent = document.getElementById('text-accent-color') as HTMLInputElement | null;
  const ratioWhite = document.getElementById('ratio-white');
  const ratioDark = document.getElementById('ratio-dark');
  const codeOutput = document.getElementById('code-output');
  const btnExportCss = document.getElementById('btn-export-css');
  const btnExportTs = document.getElementById('btn-export-ts');
  const btnCopy = document.getElementById('btn-copy-output');

  function update(): void {
    const primary = inputPrimary?.value || '#0f172a';
    const accent = inputAccent?.value || '#0284c7';

    if (textPrimary) textPrimary.value = primary;
    if (textAccent) textAccent.value = accent;

    const rWhite = getContrastRatio(primary, '#ffffff');
    const rDark = getContrastRatio(primary, '#0f172a');

    if (ratioWhite) ratioWhite.innerText = `${rWhite} : 1`;
    if (ratioDark) ratioDark.innerText = `${rDark} : 1`;

    if (codeOutput && !codeOutput.innerText) {
      codeOutput.innerText = exportCssTokens(primary, accent);
    }
  }

  inputPrimary?.addEventListener('input', () => {
    update();
    if (codeOutput) codeOutput.innerText = exportCssTokens(inputPrimary.value, inputAccent?.value || '#0284c7');
  });

  inputAccent?.addEventListener('input', () => {
    update();
    if (codeOutput) codeOutput.innerText = exportCssTokens(inputPrimary?.value || '#0f172a', inputAccent.value);
  });

  btnExportCss?.addEventListener('click', () => {
    const primary = inputPrimary?.value || '#0f172a';
    const accent = inputAccent?.value || '#0284c7';
    if (codeOutput) codeOutput.innerText = exportCssTokens(primary, accent);
  });

  btnExportTs?.addEventListener('click', () => {
    const primary = inputPrimary?.value || '#0f172a';
    const accent = inputAccent?.value || '#0284c7';
    if (codeOutput) codeOutput.innerText = exportTypeScriptTokens(primary, accent);
  });

  btnCopy?.addEventListener('click', () => {
    if (codeOutput) {
      navigator.clipboard.writeText(codeOutput.innerText);
      btnCopy.innerText = 'Copied!';
      setTimeout(() => (btnCopy.innerText = 'Copy Output'), 1500);
    }
  });

  update();
}
