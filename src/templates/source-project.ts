export interface TemplateContext {
  owner: string;
  repo: string;
}

export function generateSourceProject(ctx: TemplateContext): string {
  return `\`\`\`aura width=800 height=160
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', borderRadius: 20, padding: 30, fontFamily: 'Inter, sans-serif' }}>
  <span style={{ fontSize: 36, fontWeight: 700, color: 'white' }}>${ctx.repo}</span>
  <span style={{ fontSize: 16, color: '#a0a0b8', marginTop: 8 }}>Add your project description here</span>
</div>
\`\`\`

## Installation

\`\`\`bash
npm install ${ctx.repo}
\`\`\`

## Usage

Describe how to use your project here.

## License

MIT
`;
}
