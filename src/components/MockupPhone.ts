import type { GitHubData } from '../types.js';

type H = (type: unknown, props: Record<string, unknown> | null, ...children: unknown[]) => unknown;

/**
 * Phone-frame mockup card — displays profile info, mini stats, and top repos.
 * Usage in aura blocks:  <MockupPhone github={github} />
 * Recommended dimensions: width=380 height=680
 */
export function makeMockupPhone(h: H) {
  return function MockupPhone({ github }: { github: GitHubData }) {
    const topRepos = github.repos.slice(0, 4);
    const initial = (github.user.name || github.user.login).charAt(0).toUpperCase();

    return h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#111111',
          borderRadius: 44,
          border: '4px solid #252525',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px #1a1a1a',
          fontFamily: 'Inter, sans-serif',
          overflow: 'hidden',
        },
      },

      // ── Camera island ───────────────────────────────────────────
      h(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 14,
            paddingBottom: 12,
            background: '#111111',
          },
        },
        h('div', {
          style: {
            width: 80,
            height: 22,
            background: '#0a0a0a',
            borderRadius: 11,
            border: '1px solid #1e1e1e',
          },
        }),
      ),

      // ── Screen ─────────────────────────────────────────────────
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            background: '#0a0f1a',
            padding: '14px 16px',
          },
        },

        // Profile row
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 } },
          // Avatar circle with initial
          h(
            'div',
            {
              style: {
                width: 44,
                height: 44,
                borderRadius: 22,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: '2px solid #667eea',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(102,126,234,0.4)',
              },
            },
            h('span', { style: { fontSize: 18, color: 'white', fontWeight: 700 } }, initial),
          ),
          // Name + handle
          h(
            'div',
            { style: { display: 'flex', flexDirection: 'column' } },
            h(
              'span',
              { style: { fontSize: 14, fontWeight: 700, color: '#e2e8f0' } },
              github.user.name || github.user.login,
            ),
            h('span', { style: { fontSize: 11, color: '#4a5568' } }, '@' + github.user.login),
          ),
        ),

        // Mini stats row
        h(
          'div',
          {
            style: {
              display: 'flex',
              gap: 0,
              marginBottom: 14,
              background: '#0d1117',
              borderRadius: 10,
              border: '1px solid #1a2332',
              overflow: 'hidden',
            },
          },
          ...[
            { label: 'STARS', value: github.stats.totalStars, color: '#ffd700' },
            { label: 'COMMITS', value: github.stats.totalCommits, color: '#00e5ff' },
            { label: 'REPOS', value: github.stats.totalRepos, color: '#a78bfa' },
          ].flatMap((stat, i, arr) => {
            const tile = h(
              'div',
              {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  padding: '10px 4px',
                },
              },
              h(
                'span',
                { style: { fontSize: 16, fontWeight: 700, color: stat.color } },
                String(stat.value),
              ),
              h(
                'span',
                { style: { fontSize: 8, color: '#4a5568', marginTop: 3, letterSpacing: 1 } },
                stat.label,
              ),
            );
            // Divider between tiles
            const divider =
              i < arr.length - 1 ? h('div', { style: { width: 1, background: '#1a2332' } }) : null;
            return divider ? [tile, divider] : [tile];
          }),
        ),

        // "TOP REPOS" label
        h(
          'span',
          {
            style: {
              fontSize: 9,
              color: '#2d3748',
              fontWeight: 700,
              letterSpacing: 1.5,
              marginBottom: 8,
            },
          },
          'TOP REPOS',
        ),

        // Repo list
        h(
          'div',
          { style: { display: 'flex', flexDirection: 'column', gap: 6, flex: 1 } },
          ...topRepos.map((repo) =>
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '9px 11px',
                  background: '#0d1117',
                  borderRadius: 8,
                  border: '1px solid #1a2332',
                },
              },
              // Repo name + stars
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                },
                h(
                  'span',
                  { style: { fontSize: 12, fontWeight: 600, color: '#58a6ff' } },
                  repo.name,
                ),
                h(
                  'div',
                  { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                  h('span', { style: { fontSize: 10, color: '#ffd700' } }, '★'),
                  h('span', { style: { fontSize: 10, color: '#6e7681' } }, String(repo.stars)),
                ),
              ),
              // Language pill
              repo.language
                ? h(
                    'div',
                    { style: { display: 'flex', marginTop: 5 } },
                    h(
                      'span',
                      {
                        style: {
                          fontSize: 9,
                          color: '#4a5568',
                          background: '#161b22',
                          padding: '2px 7px',
                          borderRadius: 4,
                        },
                      },
                      repo.language,
                    ),
                  )
                : null,
            ),
          ),
        ),
      ),

      // ── Home indicator bar ──────────────────────────────────────
      h(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '12px 0',
            background: '#111111',
          },
        },
        h('div', {
          style: { width: 100, height: 4, background: '#2a2a2a', borderRadius: 2 },
        }),
      ),
    );
  };
}
