import { readFile, readdir } from 'node:fs/promises';
import { resolve, basename, extname } from 'node:path';
import { createRequire } from 'node:module';
import type { FontConfig } from './types.js';

const require = createRequire(import.meta.url);

const FONT_EXTENSIONS = ['.ttf', '.otf', '.woff'];

export async function loadDefaultFonts(): Promise<FontConfig[]> {
  try {
    return await loadFontsourceInter();
  } catch {
    console.log('  @fontsource/inter not found, fetching from Google Fonts CDN...');
    return await loadInterFromCDN();
  }
}

async function loadFontsourceInter(): Promise<FontConfig[]> {
  const basePath = resolve(require.resolve('@fontsource/inter/metadata.json'), '..', 'files');

  const regular = await readFile(resolve(basePath, 'inter-latin-400-normal.woff'));
  const bold = await readFile(resolve(basePath, 'inter-latin-700-normal.woff'));

  return [
    { name: 'Inter', data: regular.buffer as ArrayBuffer, weight: 400, style: 'normal' },
    { name: 'Inter', data: bold.buffer as ArrayBuffer, weight: 700, style: 'normal' },
  ];
}

async function loadInterFromCDN(): Promise<FontConfig[]> {
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
  const cssResponse = await fetch(cssUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36' },
  });
  const css = await cssResponse.text();

  const urls = [...css.matchAll(/src:\s*url\(([^)]+\.woff)\)/g)].map((m) => m[1]);
  if (urls.length === 0) {
    throw new Error('Could not extract font URL from Google Fonts CSS');
  }

  const fonts: FontConfig[] = [];
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    const weight = url.includes('700') ? 700 : 400;
    fonts.push({ name: 'Inter', data, weight, style: 'normal' });
  }
  return fonts;
}

export async function loadFontsFromDir(dirPath: string): Promise<FontConfig[]> {
  const absDir = resolve(dirPath);
  const files = await readdir(absDir);
  const fontFiles = files.filter((f) => FONT_EXTENSIONS.includes(extname(f).toLowerCase()));

  if (fontFiles.length === 0) {
    throw new Error(`No font files (${FONT_EXTENSIONS.join(', ')}) found in ${absDir}`);
  }

  const fonts: FontConfig[] = [];
  for (const file of fontFiles) {
    const data = await readFile(resolve(absDir, file));
    const name = basename(file, extname(file)).replace(
      /[-_](Regular|Bold|Italic|Light|Medium|SemiBold|ExtraBold|Black|\d+)/gi,
      '',
    );
    fonts.push({ name, data: data.buffer as ArrayBuffer, weight: 400, style: 'normal' });
  }
  return fonts;
}
