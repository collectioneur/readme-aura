# Wow Components — readme-aura Built-in Library

`StatsCard` and `MockupPhone` ship with readme-aura and are available in every `aura` block
without any imports. Just use them like `<StatsCard github={github} />`.

---

## Hero Banner

```aura width=800 height=110
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%', background: 'linear-gradient(135deg, #090917 0%, #0d0d2e 50%, #090917 100%)', borderRadius: 20, padding: '0 36px', fontFamily: 'Inter, sans-serif', border: '1px solid #1c1c4e' }}>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <span style={{ fontSize: 26, fontWeight: 700, color: 'white' }}>Wow Components</span>
    <span style={{ fontSize: 13, color: '#5555aa', marginTop: 4 }}>readme-aura built-in component library</span>
  </div>
  <div style={{ display: 'flex', gap: 8 }}>
    <span style={{ padding: '5px 14px', background: '#667eea22', color: '#667eea', borderRadius: 20, fontSize: 12, fontWeight: 600, border: '1px solid #667eea44' }}>StatsCard</span>
    <span style={{ padding: '5px 14px', background: '#a78bfa22', color: '#a78bfa', borderRadius: 20, fontSize: 12, fontWeight: 600, border: '1px solid #a78bfa44' }}>MockupPhone</span>
  </div>
</div>
```

---

## `<StatsCard />`

Cyberpunk/neon stats card — stars, commits, repos, forks as glowing tiles with a language strip.
Syntax: `` ```aura width=800 height=190 `` then `<StatsCard github={github} />` then ` ``` `.

```aura width=800 height=190
<StatsCard github={github} />
```

You can spread-override specific values for static/preview use:

```aura width=800 height=190
<div style={{ display: 'flex', width: '100%', height: '100%' }}>
  <StatsCard github={{
    ...github,
    user: { ...github.user, login: 'your-handle', name: 'Your Name' },
    stats: { totalStars: 9999, totalCommits: 3142, totalRepos: 42, totalForks: 256 }
  }} />
</div>
```

---

## `<MockupPhone />`

Phone-frame mockup — avatar initial, mini stats bar, and top repositories inside a phone shell.
Syntax: `` ```aura width=380 height=680 `` then `<MockupPhone github={github} />` then ` ``` `.

```aura width=380 height=680
<MockupPhone github={github} />
```

---

## Combined Dashboard

Both components composed inside a single `aura` block — phone frame on the right, stats and
language grid on the left, all unified on one dark canvas.

```aura width=800 height=480
<div style={{ display: 'flex', width: '100%', height: '100%', background: '#050510', borderRadius: 24, padding: 20, fontFamily: 'Inter, sans-serif', gap: 18 }}>
  <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 14 }}>
    <div style={{ display: 'flex', flex: 1 }}>
      <StatsCard github={github} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #090917 0%, #0d0d2e 100%)', borderRadius: 16, padding: '14px 18px', border: '1px solid #1c1c4e' }}>
      <span style={{ fontSize: 9, color: '#44448a', letterSpacing: 1.5, marginBottom: 10 }}>TOP LANGUAGES</span>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {github.languages.map(function(lang) {
          return (
            <div key={lang.name} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: '#0a0a22', borderRadius: 10, border: '1px solid #1e1e4e' }}>
              <div style={{ width: 7, height: 7, borderRadius: 4, background: lang.color, boxShadow: '0 0 6px ' + lang.color }} />
              <span style={{ fontSize: 11, color: '#8888cc' }}>{lang.name}</span>
              <span style={{ fontSize: 10, color: '#33336e' }}>{lang.percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  <div style={{ display: 'flex', width: 210 }}>
    <MockupPhone github={github} />
  </div>
</div>
```

---

## Custom Composition (Raw JSX)

Full creative control — no components required. This is a hand-written profile card using only
raw Satori-compatible JSX with gradients, glows, and live GitHub data.

```aura width=800 height=130
<div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', background: '#0d0d1e', borderRadius: 18, padding: '0 28px', gap: 20, fontFamily: 'Inter, sans-serif', border: '1px solid #1c1c4e' }}>
  <div style={{ display: 'flex', width: 56, height: 56, borderRadius: 28, background: 'linear-gradient(135deg, #667eea, #764ba2)', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(102,126,234,0.5)' }}>
    <span style={{ fontSize: 24, color: 'white', fontWeight: 700 }}>{github.user.login.charAt(0).toUpperCase()}</span>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
    <span style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{github.user.name || github.user.login}</span>
    <span style={{ fontSize: 12, color: '#5555aa', marginTop: 3 }}>{github.user.bio || 'Open-source developer'}</span>
  </div>
  <div style={{ display: 'flex', gap: 12 }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{ fontSize: 22, fontWeight: 700, color: '#ffd700' }}>{github.stats.totalStars}</span>
      <span style={{ fontSize: 10, color: '#44448a', letterSpacing: 1 }}>STARS</span>
    </div>
    <div style={{ width: 1, background: '#1c1c4e' }} />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{ fontSize: 22, fontWeight: 700, color: '#00e5ff' }}>{github.stats.totalCommits}</span>
      <span style={{ fontSize: 10, color: '#44448a', letterSpacing: 1 }}>COMMITS</span>
    </div>
    <div style={{ width: 1, background: '#1c1c4e' }} />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{ fontSize: 22, fontWeight: 700, color: '#a78bfa' }}>{github.stats.totalRepos}</span>
      <span style={{ fontSize: 10, color: '#44448a', letterSpacing: 1 }}>REPOS</span>
    </div>
  </div>
</div>
```
