type H = (type: unknown, props: Record<string, unknown> | null, ...children: unknown[]) => unknown;

interface GradientStop {
  offset: string;
  color: string;
}

interface SocialMediaButtonProps {
  icon: string;
  text: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  width?: number;
  height?: number;
  gradientStops?: GradientStop[];
  gradientStrokeWidth?: number;
  borderColor?: string;
  iconSize?: number;
}

const DEFAULT_GRADIENT_STOPS: GradientStop[] = [
  { offset: '0%', color: '#ffffff' },
  { offset: '10%', color: '#111111' },
  { offset: '50%', color: '#eeeeee' },
  { offset: '60%', color: '#ffbbaa' },
  { offset: '80%', color: '#111111' },
  { offset: '100%', color: '#555555' },
];

/**
 * Pill-shaped social media button with an animated holographic gradient border.
 * Usage in aura blocks:
 *   <SocialMediaButton icon="icons/x-icon.png" text="@handle" />
 * Recommended aura dimensions: width=150 height=40 (match the width/height props)
 */
export function makeSocialMediaButton(h: H) {
  return function SocialMediaButton({
    icon,
    text,
    backgroundColor = '#111111',
    textColor = '#f5f5f5',
    fontSize = 13,
    width = 150,
    height = 40,
    gradientStops = DEFAULT_GRADIENT_STOPS,
    gradientStrokeWidth = 2,
    borderColor = '#AAAAAA',
    iconSize = 18,
  }: SocialMediaButtonProps) {
    const gradientId = `smb-grad-${text.replace(/[^a-zA-Z0-9]/g, '')}`;
    const borderRadius = height / 2;

    const innerOffset = gradientStrokeWidth / 2 + 0.25;
    const innerW = width - innerOffset * 2;
    const innerH = height - innerOffset * 2;
    const innerRx = innerH / 2;

    const outerOffset = 0.25;
    const outerW = width - outerOffset * 2;
    const outerH = height - outerOffset * 2;
    const outerRx = outerH / 2;

    return h(
      'div',
      {
        style: {
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor,
          borderRadius,
          boxSizing: 'border-box',
        },
      },

      h(
        'svg',
        {
          width: String(width),
          height: String(height),
          viewBox: `0 0 ${width} ${height}`,
          overflow: 'visible',
          xmlns: 'http://www.w3.org/2000/svg',
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            overflow: 'visible',
          },
        },
        h(
          'defs',
          null,
          h(
            'linearGradient',
            {
              id: gradientId,
              gradientUnits: 'objectBoundingBox',
              x1: '0',
              y1: '0',
              x2: '1',
              y2: '1',
            },
            ...gradientStops.map((stop) =>
              h('stop', { offset: stop.offset, stopColor: stop.color }),
            ),
            h('animateTransform', {
              attributeName: 'gradientTransform',
              type: 'rotate',
              from: '0 0.5 0.5',
              to: '360 0.5 0.5',
              dur: '8s',
              repeatCount: 'indefinite',
            }),
          ),
        ),
        h('rect', {
          x: String(innerOffset),
          y: String(innerOffset),
          width: String(innerW),
          height: String(innerH),
          rx: String(innerRx),
          ry: String(innerRx),
          fill: 'none',
          stroke: `url(#${gradientId})`,
          strokeWidth: String(gradientStrokeWidth),
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
        h('rect', {
          x: String(outerOffset),
          y: String(outerOffset),
          width: String(outerW),
          height: String(outerH),
          rx: String(outerRx),
          ry: String(outerRx),
          fill: 'none',
          stroke: borderColor,
          strokeWidth: '0.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      ),

      h(
        'div',
        {
          style: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            flex: 1,
            width: '100%',
            height: '100%',
            paddingLeft: 12,
            paddingRight: 12,
            boxSizing: 'border-box',
          },
        },
        h('img', {
          src: icon,
          width: iconSize,
          height: iconSize,
          alt: '',
          style: { flexShrink: 0, display: 'block', width: iconSize, height: iconSize },
        }),
        h(
          'span',
          {
            style: {
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize,
              color: textColor,
              letterSpacing: '-0.2px',
            },
          },
          text,
        ),
      ),
    );
  };
}
