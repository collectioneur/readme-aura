import { useId, useRef, useEffect, useState } from 'react';

interface Metrics {
  size: number;
  spacing: number;
  baseline: number;
  fontFamily: string;
  fontWeight: string;
}

export default function BlurGlassTitle({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const uid = useId().replace(/:/g, '_');
  const [m, setM] = useState<Metrics | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const s = getComputedStyle(el);
      const size = parseFloat(s.fontSize);
      const spacing = parseFloat(s.letterSpacing) || 0;
      const fontFamily = s.fontFamily;
      const fontWeight = s.fontWeight;

      // Inter ascender ≈ 0.969em above baseline
      // Half-leading shifts baseline from top of the line box
      const naturalLineHeight = size * 1.21;
      const cssLineHeight = parseFloat(s.lineHeight);
      const effectiveLineHeight = isNaN(cssLineHeight) ? naturalLineHeight : cssLineHeight;
      const halfLeading = (effectiveLineHeight - naturalLineHeight) / 2;
      const baseline = halfLeading + size * 0.969;

      setM({ size, spacing, baseline, fontFamily, fontWeight });
    };

    // Re-measure after fonts are ready for accurate metrics
    measure();
    document.fonts.ready.then(measure);

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Hidden SVG clip path definition */}
      {m && (
        <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden>
          <defs>
            <clipPath id={uid} clipPathUnits="userSpaceOnUse">
              <text
                x="0"
                y={m.baseline}
                fontFamily={m.fontFamily}
                fontWeight={m.fontWeight}
                fontSize={m.size}
                letterSpacing={m.spacing}
              >
                {children}
              </text>
            </clipPath>
          </defs>
        </svg>
      )}

      {/* Invisible spacer — holds layout dimensions */}
      <span style={{ visibility: 'hidden', userSelect: 'none' }} aria-hidden>
        {children}
      </span>

      {/* Blur layer clipped to the text glyph shapes */}
      {m && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: `url(#${uid})`,
            backdropFilter: 'blur(200px) saturate(1.2) brightness(1.2)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.8) brightness(1.3)',
          }}
        />
      )}

      {/* SVG stroke overlay — gives letters a glass-edge definition */}
      {m && (
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
            pointerEvents: 'none',
          }}
          aria-hidden
        >
          <text
            x="0"
            y={m.baseline}
            fontFamily={m.fontFamily}
            fontWeight={m.fontWeight}
            fontSize={m.size}
            letterSpacing={m.spacing}
            fill="none"
          >
            {children}
          </text>
        </svg>
      )}
    </span>
  );
}
