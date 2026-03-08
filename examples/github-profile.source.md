# GitHub Profile Example

This example demonstrates how to use `github.*` data in aura blocks.
Run with: `npx readme-aura build -s examples/github-profile.source.md -o examples/github-profile.md --github-user YOUR_USERNAME`

## Profile Card

```aura width=800 height=200
<div style={{ display: 'flex', width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', borderRadius: 20, padding: 32, fontFamily: 'Inter, sans-serif', gap: 24, alignItems: 'center' }}>
  <img src={github.user.avatarUrl} width={96} height={96} style={{ borderRadius: 48, border: '3px solid #667eea' }} />
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
    <span style={{ fontSize: 28, fontWeight: 700, color: 'white' }}>{github.user.name || github.user.login}</span>
    <span style={{ fontSize: 14, color: '#a0a0b8', marginTop: 4 }}>@{github.user.login}</span>
    <span style={{ fontSize: 14, color: '#c0c0d0', marginTop: 8 }}>{github.user.bio || ''}</span>
    <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
      <span style={{ fontSize: 13, color: '#7c7c9a' }}>{github.user.followers} followers</span>
      <span style={{ fontSize: 13, color: '#7c7c9a' }}>{github.user.following} following</span>
    </div>
  </div>
</div>
```

## Stats Overview

```aura width=800 height=140
<div style={{ display: 'flex', width: '100%', height: '100%', gap: 12, fontFamily: 'Inter, sans-serif' }}>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#161b22', borderRadius: 14, padding: 20, alignItems: 'center', justifyContent: 'center', border: '1px solid #30363d' }}>
    <span style={{ fontSize: 32, fontWeight: 700, color: '#58a6ff' }}>{github.stats.totalStars}</span>
    <span style={{ fontSize: 13, color: '#8b949e', marginTop: 4 }}>Stars Earned</span>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#161b22', borderRadius: 14, padding: 20, alignItems: 'center', justifyContent: 'center', border: '1px solid #30363d' }}>
    <span style={{ fontSize: 32, fontWeight: 700, color: '#7ee787' }}>{github.stats.totalCommits}</span>
    <span style={{ fontSize: 13, color: '#8b949e', marginTop: 4 }}>Total Commits</span>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#161b22', borderRadius: 14, padding: 20, alignItems: 'center', justifyContent: 'center', border: '1px solid #30363d' }}>
    <span style={{ fontSize: 32, fontWeight: 700, color: '#d2a8ff' }}>{github.stats.totalRepos}</span>
    <span style={{ fontSize: 13, color: '#8b949e', marginTop: 4 }}>Repositories</span>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#161b22', borderRadius: 14, padding: 20, alignItems: 'center', justifyContent: 'center', border: '1px solid #30363d' }}>
    <span style={{ fontSize: 32, fontWeight: 700, color: '#f0883e' }}>{github.stats.totalForks}</span>
    <span style={{ fontSize: 13, color: '#8b949e', marginTop: 4 }}>Forks</span>
  </div>
</div>
```

## Top Languages

```aura width=800 height=120
<div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#0d1117', borderRadius: 14, padding: 20, fontFamily: 'Inter, sans-serif', justifyContent: 'center' }}>
  <span style={{ fontSize: 15, fontWeight: 700, color: '#c9d1d9', marginBottom: 12 }}>Most Used Languages</span>
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    {github.languages.map(function(lang) {
      return (
        <div key={lang.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: '#161b22', borderRadius: 12, border: '1px solid #30363d' }}>
          <div style={{ width: 10, height: 10, borderRadius: 5, background: lang.color }} />
          <span style={{ fontSize: 12, color: '#c9d1d9' }}>{lang.name}</span>
          <span style={{ fontSize: 11, color: '#8b949e' }}>{lang.percentage}%</span>
        </div>
      );
    })}
  </div>
</div>
```
