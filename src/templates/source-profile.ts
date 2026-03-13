export interface TemplateContext {
  owner: string;
  repo: string;
}

const BADGE =
  '[![readme-aura](https://img.shields.io/badge/readme--aura-powered-8b5cf6?style=flat)](https://github.com/collectioneur/readme-aura)';

export function generateSourceProfile(ctx: TemplateContext): string {
  return `${BADGE}

\`\`\`aura width=800 height=200
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', borderRadius: 20, padding: 30, fontFamily: 'Inter, sans-serif' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <img src={github.user.avatarUrl} width={64} height={64} style={{ borderRadius: 32 }} />
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: 32, fontWeight: 700, color: 'white' }}>{github.user.name || '${ctx.owner}'}</span>
      <span style={{ fontSize: 16, color: '#a0a0b8', marginTop: 4 }}>{github.user.bio || 'GitHub Profile'}</span>
    </div>
  </div>
</div>
\`\`\`

\`\`\`aura width=800 height=220
<StatsCard github={github} />
\`\`\`

## About Me

Write something about yourself here.

## Projects

Check out my pinned repositories below.
`;
}
