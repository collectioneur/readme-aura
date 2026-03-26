import { AURA_GLOW_SVG, AURA_KEYFRAMES_CSS } from './aura-hero-assets.js';

export interface TemplateContext {
  owner: string;
  repo: string;
}

export function generateSourceProfile(ctx: TemplateContext): string {
  return `

\`\`\`aura width=860 height=248
<div style={{ width: '100%', height: '100%', background: '#08080c', display: 'flex', flexDirection: 'column', fontFamily: 'Inter', position: 'relative', overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(110,80,220,0.18)' }}>
  <div style={{ flex: 1, width: '100%', position: 'relative', minHeight: 180, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
  <style>{\`${AURA_KEYFRAMES_CSS}\`}</style>
  ${AURA_GLOW_SVG}
  <div style={{
    position: 'absolute', left: 48, top: 52, width: 96, height: 96,
    borderRadius: 48, background: 'linear-gradient(135deg, #6622ee, #0088ff)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <img src={github?.user?.avatarUrl ?? 'https://github.com/${ctx.owner}.png'} width={88} height={88} style={{ borderRadius: 44 }} />
  </div>

  <div style={{ display:'flex', flexDirection:'column', marginLeft:168, gap:8 }}>
    <div style={{ display:'flex', fontSize:38, fontWeight:800, color:'#ffffff', letterSpacing:'-1px', lineHeight:1 }}>
      {github?.user?.name || github?.user?.login || '${ctx.owner}'}
    </div>
    <div style={{ display:'flex', fontSize:15, color:'rgba(180,165,255,0.8)', fontWeight:400, letterSpacing:'0.3px' }}>
      {github?.user?.bio || 'Full-Stack Engineer · Competitive Programmer · Open Source'}
    </div>
    <div style={{ display:'flex', gap:8, marginTop:6, flexWrap: 'wrap' }}>
      {((github && github.languages && github.languages.length > 0)
        ? github.languages.slice(0, 4).map(function(l) { return l.name; })
        : ['TypeScript', 'React', 'Node.js', 'Open Source']
      ).map(function(tag, i) {
        return (
          <div key={tag + '-' + i} style={{
            display:'flex', padding:'4px 12px', borderRadius:20,
            background:'rgba(80,40,220,0.18)', border:'1px solid rgba(100,70,240,0.32)',
            color:'rgba(205,195,255,0.85)', fontSize:12, fontWeight:600,
          }}>{tag}</div>
        );
      })}
    </div>
  </div>
  </div>
</div>
\`\`\`

\`\`\`aura width=860 height=248
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', paddingBottom: 10, paddingTop: 4 }}>
    <span style={{ fontSize: 11, color: 'rgba(150,140,200,0.55)', fontWeight: 500, letterSpacing: '0.4px' }}>powered by readme-aura</span>
  </div>
\`\`\`
`;
}
