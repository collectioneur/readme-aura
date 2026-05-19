import { describe, it, expect } from 'vitest';
import { generateSVG, mockData } from '../profile.js';

describe('profile', () => {
  it('generates a valid SVG string', () => {
    const data = mockData();
    const svg = generateSVG(data);

    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('ACE');
    expect(svg).toContain('BrainDance OS');
  });
});
