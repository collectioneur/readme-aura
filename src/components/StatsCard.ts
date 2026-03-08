import type { GitHubData } from '../types.js';

type H = (type: unknown, props: Record<string, unknown> | null, ...children: unknown[]) => unknown;

const STATS = [
  { label: 'STARS',   key: 'totalStars'   as const, color: '#ffd700', shadow: '0 0 22px rgba(255,215,0,0.35)'     },
  { label: 'COMMITS', key: 'totalCommits' as const, color: '#00e5ff', shadow: '0 0 22px rgba(0,229,255,0.35)'    },
  { label: 'REPOS',   key: 'totalRepos'   as const, color: '#a78bfa', shadow: '0 0 22px rgba(167,139,250,0.35)'  },
  { label: 'FORKS',   key: 'totalForks'   as const, color: '#f472b6', shadow: '0 0 22px rgba(244,114,182,0.35)'  },
];

/**
 * Neon/cyberpunk stats card — shows stars, commits, repos, forks + top languages.
 * Usage in aura blocks:  <StatsCard github={github} />
 * Recommended dimensions: width=800 height=190
 */
export function makeStatsCard(h: H) {
  return function StatsCard({ github }: { github: GitHubData }) {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #090917 0%, #0d0d2e 100%)',
          borderRadius: 20,
          padding: '22px 26px',
          fontFamily: 'Inter, sans-serif',
          border: '1px solid #1c1c4e',
        },
      },

      // ── Header ─────────────────────────────────────────────────
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 } },
        // Neon pulse dot
        h('div', {
          style: {
            width: 8,
            height: 8,
            borderRadius: 4,
            background: '#00ff9f',
            boxShadow: '0 0 8px #00ff9f, 0 0 16px rgba(0,255,159,0.5)',
          },
        }),
        // Username label
        h(
          'span',
          { style: { fontSize: 12, color: '#667eea', fontWeight: 700, letterSpacing: 2 } },
          '@' + github.user.login + ' // stats',
        ),
        // Full name (right-aligned)
        h(
          'div',
          { style: { display: 'flex', flex: 1, justifyContent: 'flex-end' } },
          h(
            'span',
            { style: { fontSize: 11, color: '#33336e' } },
            github.user.name || '',
          ),
        ),
      ),

      // ── Stat tiles ─────────────────────────────────────────────
      h(
        'div',
        { style: { display: 'flex', gap: 10, flex: 1 } },
        ...STATS.map(({ label, key, color, shadow }) =>
          h(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                background: '#0a0a22',
                borderRadius: 14,
                padding: '14px 18px',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #1e1e4e',
                boxShadow: shadow,
              },
            },
            h(
              'span',
              { style: { fontSize: 28, fontWeight: 700, color, lineHeight: '1' } },
              String(github.stats[key]),
            ),
            h(
              'span',
              { style: { fontSize: 9, color: '#44448a', marginTop: 8, letterSpacing: 1.5 } },
              label,
            ),
          ),
        ),
      ),

      // ── Language strip ─────────────────────────────────────────
      github.languages.length > 0
        ? h(
            'div',
            { style: { display: 'flex', gap: 12, marginTop: 14, alignItems: 'center' } },
            ...github.languages.slice(0, 6).map((lang) =>
              h(
                'div',
                { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                h('div', {
                  style: {
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    background: lang.color,
                  },
                }),
                h('span', { style: { fontSize: 9, color: '#44448a' } }, lang.name),
              ),
            ),
          )
        : null,
    );
  };
}
