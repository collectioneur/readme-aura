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
