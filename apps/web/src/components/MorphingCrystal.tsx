/**
 * Morphing Crystal preset — adapted from https://github.com/collectioneur/ShaderUI
 *
 * Volumetric cloud look approximated with 2D FBM-style noise (Perlin),
 * masked by the SDF so the effect repeats the shape (text/glyph).
 */
import React, { useRef, useMemo, useEffect } from 'react';
import tgpu from 'typegpu';
import * as d from 'typegpu/data';
import * as std from 'typegpu/std';
import { perlin2d } from '@typegpu/noise';
import {
  InteractionArea,
  ShaderCanvas,
  defineUniforms,
  distSampleLayout,
  useShaderInteractionUniforms,
  type FontConfig,
  type Padding,
} from 'shaderui';

const NOISE_SCALE = 1.0;
const FBM_LAYERS = 1.0;
const FWIDTH_AA_SCALE = 1.5;
const SDF_GRAD_STEP = 1.0;
const LIGHT_STEPS = 1;

const U = defineUniforms({
  time: { schema: d.f32, value: 0, control: { editable: false } },
  cloudDensity: {
    schema: d.f32,
    value: 1,
    control: {
      editable: true,
      kind: 'range',
      label: 'Cloud density',
      min: 0.1,
      max: 1,
      step: 0.01,
      group: 'Cloud',
      decimals: 2,
    },
  },
  cloudSpeed: {
    schema: d.f32,
    value: 1.24,
    control: {
      editable: true,
      kind: 'range',
      label: 'Cloud speed',
      min: 0,
      max: 2,
      step: 0.01,
      group: 'Cloud',
      decimals: 2,
    },
  },
  dynamicity: {
    schema: d.f32,
    value: 0.0,
    control: {
      editable: true,
      kind: 'range',
      label: 'Dynamicity',
      min: 0,
      max: 2,
      step: 0.01,
      group: 'Cloud',
      decimals: 2,
    },
  },
  turbulence: {
    schema: d.f32,
    value: 2.0,
    control: {
      editable: true,
      kind: 'range',
      label: 'Turbulence',
      min: 0,
      max: 2,
      step: 0.01,
      group: 'Cloud',
      decimals: 2,
    },
  },
  thickness: {
    schema: d.f32,
    value: 0.077,
    control: {
      editable: true,
      kind: 'range',
      label: 'Thickness',
      min: 0.015,
      max: 0.2,
      step: 0.001,
      group: 'Depth',
      decimals: 3,
    },
  },
  edgeSoftness: {
    schema: d.f32,
    value: 1.62,
    control: {
      editable: true,
      kind: 'range',
      label: 'Edge softness',
      min: 0.5,
      max: 3,
      step: 0.01,
      group: 'Depth',
      decimals: 2,
    },
  },
  bevelStrength: {
    schema: d.f32,
    value: 0.0,
    control: {
      editable: true,
      kind: 'range',
      label: 'Core softness',
      min: 0,
      max: 1.5,
      step: 0.01,
      group: 'Depth',
      decimals: 2,
    },
  },
  sunIntensity: {
    schema: d.f32,
    value: 0.6,
    control: {
      editable: true,
      kind: 'range',
      label: 'Sun intensity',
      min: 0,
      max: 1.5,
      step: 0.01,
      group: 'Light',
      decimals: 2,
    },
  },
  shadowStrength: {
    schema: d.f32,
    value: 0.6,
    control: {
      editable: true,
      kind: 'range',
      label: 'Shadow strength',
      min: 0,
      max: 1.5,
      step: 0.01,
      group: 'Light',
      decimals: 2,
    },
  },
  silverLining: {
    schema: d.f32,
    value: 0.62,
    control: {
      editable: true,
      kind: 'range',
      label: 'Silver lining',
      min: 0,
      max: 1.5,
      step: 0.01,
      group: 'Light',
      decimals: 2,
    },
  },
  phaseAnisotropy: {
    schema: d.f32,
    value: 0.6,
    control: {
      editable: true,
      kind: 'range',
      label: 'Phase anisotropy',
      min: 0,
      max: 1.2,
      step: 0.01,
      group: 'Light',
      decimals: 2,
    },
  },
  lightStep: {
    schema: d.f32,
    value: 0.018,
    control: {
      editable: true,
      kind: 'range',
      label: 'Light step',
      min: 0.006,
      max: 0.035,
      step: 0.001,
      group: 'Light',
      decimals: 3,
    },
  },
  cloudContrast: {
    schema: d.f32,
    value: 0.75,
    control: {
      editable: true,
      kind: 'range',
      label: 'Cloud contrast',
      min: 0.5,
      max: 2.2,
      step: 0.01,
      group: 'Cloud',
      decimals: 2,
    },
  },
  warmTint: {
    schema: d.f32,
    value: 0.62,
    control: {
      editable: true,
      kind: 'range',
      label: 'Warm tint',
      min: 0,
      max: 1,
      step: 0.01,
      group: 'Color',
      decimals: 2,
    },
  },
  parallaxIntensity: {
    schema: d.f32,
    value: 0.38,
    control: {
      editable: true,
      kind: 'range',
      label: 'Direction follow',
      min: 0,
      max: 1.25,
      step: 0.01,
      group: 'Interaction',
      decimals: 2,
    },
  },
  distortionStrength: {
    schema: d.f32,
    value: 1.0,
    control: {
      editable: true,
      kind: 'range',
      label: 'Distortion strength',
      min: 0,
      max: 4.0,
      step: 0.001,
      group: 'Interaction',
      decimals: 3,
    },
  },
  noiseScale: {
    schema: d.f32,
    value: 1.0,
    control: {
      editable: true,
      kind: 'range',
      label: 'Noise scale',
      min: 0.1,
      max: 4.0,
      step: 0.01,
      group: 'Cloud',
      decimals: 2,
    },
  },
  aspectRatio: { schema: d.f32, value: 1, control: { editable: false } },
  mouseUV: {
    schema: d.vec2f,
    value: d.vec2f(0.5, 0.5),
    control: { editable: false },
  },
  isPointerActive: { schema: d.f32, value: 0, control: { editable: false } },
});

const morphingCrystalFragment = tgpu['~unstable'].fragmentFn({
  in: { uv: d.vec2f },
  out: d.vec4f,
})(({ uv }) => {
  'use gpu';
  const u = U.$;
  const time = u.time;
  const cloudDensity = u.cloudDensity;
  const cloudSpeed = u.cloudSpeed;
  const dynamicity = u.dynamicity;
  const turbulence = u.turbulence;
  const thickness = u.thickness;
  const edgeSoftness = u.edgeSoftness;
  const bevelStrength = u.bevelStrength;
  const sunIntensity = u.sunIntensity;
  const shadowStrength = u.shadowStrength;
  const silverLining = u.silverLining;
  const phaseAnisotropy = u.phaseAnisotropy;
  const lightStep = u.lightStep;
  const cloudContrast = u.cloudContrast;
  const warmTint = u.warmTint;
  const parallaxIntensity = u.parallaxIntensity;
  const distortionStrength = u.distortionStrength;
  const noiseScale = u.noiseScale;
  const aspectRatio = u.aspectRatio;
  const mouseUV = u.mouseUV;
  const isPointerActive = u.isPointerActive;

  const distCenter = std.textureSample(
    distSampleLayout.$.distTexture,
    distSampleLayout.$.sampler,
    uv,
  ).x;

  const thicknessPx = std.max(d.f32(0.75), std.mul(thickness, d.f32(220.0)));
  const fwidthDist = std.fwidth(distCenter);
  const shapeAlpha = std.sub(
    d.f32(1.0),
    std.smoothstep(
      d.f32(0.0),
      std.mul(std.mul(fwidthDist, edgeSoftness), d.f32(FWIDTH_AA_SCALE)),
      distCenter,
    ),
  );

  const absDist = std.abs(distCenter);
  const depthMask = std.clamp(
    std.div(std.sub(thicknessPx, absDist), std.max(thicknessPx, d.f32(0.0001))),
    d.f32(0.0),
    d.f32(1.0),
  );
  const coreSoftness = std.mix(
    d.f32(2.2),
    d.f32(0.75),
    std.clamp(bevelStrength, d.f32(0.0), d.f32(1.5)),
  );
  const volumeMask = std.pow(depthMask, coreSoftness);

  const dx = d.vec2f(d.f32(SDF_GRAD_STEP), d.f32(0.0));
  const dy = d.vec2f(d.f32(0.0), d.f32(SDF_GRAD_STEP));
  const distRight = std.textureSample(
    distSampleLayout.$.distTexture,
    distSampleLayout.$.sampler,
    std.add(uv, dx),
  ).x;
  const distLeft = std.textureSample(
    distSampleLayout.$.distTexture,
    distSampleLayout.$.sampler,
    std.sub(uv, dx),
  ).x;
  const distUp = std.textureSample(
    distSampleLayout.$.distTexture,
    distSampleLayout.$.sampler,
    std.add(uv, dy),
  ).x;
  const distDown = std.textureSample(
    distSampleLayout.$.distTexture,
    distSampleLayout.$.sampler,
    std.sub(uv, dy),
  ).x;
  const gradX = std.sub(distRight, distLeft);
  const gradY = std.sub(distUp, distDown);

  const nz = d.f32(0.9);
  const normal = std.normalize(
    d.vec3f(std.mul(gradX, d.f32(-1.0)), std.mul(gradY, d.f32(-1.0)), nz),
  );

  const pointer = std.sub(mouseUV, d.vec2f(0.5, 0.5));
  const pointerDir = std.normalize(std.add(pointer, d.vec2f(0.0001, 0.0001)));
  const baseFlowDir = std.normalize(d.vec2f(0.92, -0.35));
  const directionFollow = std.clamp(
    std.mul(parallaxIntensity, isPointerActive),
    d.f32(0.0),
    d.f32(1.0),
  );
  const distortionDir = std.normalize(std.mix(baseFlowDir, pointerDir, directionFollow));
  const parallaxOffset = std.mul(
    distortionDir,
    std.mul(distortionStrength, std.mix(d.f32(0.12), d.f32(0.045), volumeMask)),
  );
  const sampleUv = std.add(uv, parallaxOffset);
  const noiseUv = d.vec2f(
    std.mul(std.mul(sampleUv.x, aspectRatio), noiseScale),
    std.mul(sampleUv.y, noiseScale),
  );

  const speed = std.mul(cloudSpeed, std.add(d.f32(0.4), std.mul(dynamicity, d.f32(1.15))));
  const timeVec = d.vec2f(std.mul(time, speed), std.mul(std.mul(time, speed), d.f32(0.35)));
  const flow = d.vec2f(
    std.mul(std.sin(std.mul(time, std.mul(speed, d.f32(0.9)))), d.f32(0.08)),
    std.mul(std.cos(std.mul(time, std.mul(speed, d.f32(0.7)))), d.f32(0.05)),
  );
  const warp = d.vec2f(
    perlin2d.sample(std.add(std.mul(noiseUv, d.f32(1.9)), std.add(timeVec, flow))),
    perlin2d.sample(
      std.add(
        std.mul(noiseUv.yx, d.f32(2.2)),
        d.vec2f(std.mul(time, speed), std.mul(std.mul(time, speed), d.f32(-1.1))),
      ),
    ),
  );
  const warpScale = std.mul(
    std.mul(turbulence, std.add(d.f32(0.4), std.mul(dynamicity, d.f32(0.5)))),
    d.f32(0.65),
  );

  let density = d.f32(0.0);
  let amplitude = d.f32(0.82);
  let frequency = d.f32(1.0);
  for (let i = 0; i < FBM_LAYERS; i++) {
    const warpedUv = std.add(
      std.mul(noiseUv, std.mul(d.f32(NOISE_SCALE), frequency)),
      std.mul(warp, std.mul(warpScale, std.add(d.f32(0.65), std.mul(frequency, d.f32(0.16))))),
    );
    density = std.add(
      density,
      std.mul(perlin2d.sample(std.add(std.add(warpedUv, timeVec), flow)), amplitude),
    );
    amplitude = std.mul(amplitude, d.f32(0.58));
    frequency = std.mul(frequency, d.f32(1.86));
  }
  density = std.add(std.mul(density, d.f32(0.5)), d.f32(0.5));
  density = std.pow(
    std.clamp(density, d.f32(0.0), d.f32(1.0)),
    std.div(d.f32(1.0), std.max(cloudContrast, d.f32(0.001))),
  );

  const detailNoise = perlin2d.sample(
    std.add(std.mul(noiseUv, d.f32(16.0)), std.mul(std.add(timeVec, flow), d.f32(2.5))),
  );
  const fluffy = std.add(
    density,
    std.mul(
      detailNoise,
      std.mul(std.mix(d.f32(0.08), d.f32(0.24), dynamicity), std.add(d.f32(0.6), turbulence)),
    ),
  );
  const cloudThreshold = std.sub(d.f32(0.6), std.mul(cloudDensity, d.f32(0.45)));
  const cloudField = std.smoothstep(
    cloudThreshold,
    std.add(cloudThreshold, std.add(d.f32(0.36), std.mul(cloudDensity, d.f32(0.2)))),
    fluffy,
  );
  const cloudBody = std.mul(cloudField, std.mix(d.f32(0.72), d.f32(1.0), volumeMask));
  const cloudDensityField = std.mul(cloudBody, std.mix(d.f32(0.55), d.f32(1.0), volumeMask));

  const sunDir = std.normalize(d.vec3f(-0.38, 0.26, 0.89));
  const viewDir = d.vec3f(0.0, 0.0, 1.0);
  const lightDir2d = std.normalize(d.vec2f(-0.52, 0.32));
  const marchBaseStep = std.mul(lightStep, std.add(d.f32(0.75), std.mul(thickness, d.f32(8.0))));
  let occ = d.f32(0.0);
  let trans = d.f32(1.0);
  for (let i = 0; i < LIGHT_STEPS; i++) {
    const stepMul = d.f32(i + 1);
    const occUv = std.add(sampleUv, std.mul(lightDir2d, std.mul(marchBaseStep, stepMul)));
    const occDist = std.textureSample(
      distSampleLayout.$.distTexture,
      distSampleLayout.$.sampler,
      occUv,
    ).x;
    const occMask = std.clamp(
      std.div(std.sub(thicknessPx, std.abs(occDist)), std.max(thicknessPx, d.f32(0.0001))),
      d.f32(0.0),
      d.f32(1.0),
    );
    const noiseOccUv = d.vec2f(
      std.mul(std.mul(occUv.x, aspectRatio), noiseScale),
      std.mul(occUv.y, noiseScale),
    );
    const occWarp = perlin2d.sample(
      std.add(std.mul(noiseOccUv, d.f32(7.5)), std.mul(std.add(timeVec, flow), d.f32(1.6))),
    );
    const occDetail = perlin2d.sample(
      std.add(std.mul(noiseOccUv.yx, d.f32(12.5)), std.mul(std.add(timeVec, flow), d.f32(2.2))),
    );
    const occDensity = std.smoothstep(
      std.sub(cloudThreshold, d.f32(0.08)),
      std.add(cloudThreshold, d.f32(0.32)),
      std.add(std.add(std.mul(occWarp, d.f32(0.7)), std.mul(occDetail, d.f32(0.3))), d.f32(0.5)),
    );
    const sampleOcc = std.mul(std.mul(occDensity, occMask), trans);
    occ = std.add(occ, sampleOcc);
    trans = std.mul(trans, std.sub(d.f32(1.0), std.mul(sampleOcc, d.f32(0.35))));
  }
  const selfShadow = std.clamp(
    std.mul(std.mul(occ, shadowStrength), d.f32(0.7)),
    d.f32(0.0),
    d.f32(1.0),
  );

  const diffuse = std.clamp(std.dot(normal, sunDir), d.f32(0.0), d.f32(1.0));
  const rim = std.pow(
    std.sub(d.f32(1.0), std.clamp(std.dot(normal, viewDir), d.f32(0.0), d.f32(1.0))),
    d.f32(2.4),
  );
  const scatter = std.pow(
    std.clamp(std.dot(std.mul(sunDir, d.f32(-1.0)), viewDir), d.f32(0.0), d.f32(1.0)),
    std.mix(d.f32(1.3), d.f32(5.0), phaseAnisotropy),
  );
  const sunsetBlue = d.vec3f(0.67, 0.76, 1.0);
  const sunsetPink = d.vec3f(1.0, 0.7, 0.82);
  const sunsetWarm = d.vec3f(1.0, 0.8, 0.68);
  const sunsetLight = std.mix(sunsetBlue, sunsetPink, warmTint);
  const cloudShadowColor = d.vec3f(0.33, 0.38, 0.56);
  const cloudMidColor = d.vec3f(0.78, 0.84, 0.97);

  const lightMix = std.clamp(
    std.sub(
      std.add(
        std.add(d.f32(0.22), std.mul(diffuse, std.mul(sunIntensity, d.f32(0.92)))),
        std.mul(scatter, std.mul(phaseAnisotropy, d.f32(0.55))),
      ),
      selfShadow,
    ),
    d.f32(0.0),
    d.f32(1.0),
  );
  const baseCloudColor = std.mix(cloudShadowColor, cloudMidColor, lightMix);
  const highlight = std.mul(
    std.mix(sunsetLight, sunsetWarm, std.mul(cloudDensity, d.f32(0.5))),
    std.mul(
      std.add(
        std.add(
          std.mul(diffuse, d.f32(0.55)),
          std.mul(scatter, std.mul(phaseAnisotropy, d.f32(0.85))),
        ),
        std.mul(rim, silverLining),
      ),
      sunIntensity,
    ),
  );
  const litColor = std.add(
    baseCloudColor,
    std.mul(highlight, std.mix(d.f32(0.4), d.f32(1.0), cloudDensityField)),
  );

  const alpha = std.clamp(
    std.mul(
      shapeAlpha,
      std.mix(
        std.mul(cloudDensityField, d.f32(0.5)),
        std.mul(cloudDensityField, d.f32(1.25)),
        std.smoothstep(d.f32(0.18), d.f32(0.95), cloudDensityField),
      ),
    ),
    d.f32(0.0),
    d.f32(1.0),
  );
  const premul = std.mul(litColor, alpha);

  return d.vec4f(premul.x * 0.8, premul.y * 0.9, premul.z * 1.0, alpha);
});

const DEFAULT_PADDING = {
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
} satisfies Padding;

export interface MorphingCrystalProps {
  text: string;
  font: FontConfig;
  padding?: Partial<Padding>;
  cloudDensity?: number;
  cloudSpeed?: number;
  dynamicity?: number;
  turbulence?: number;
  thickness?: number;
  edgeSoftness?: number;
  bevelStrength?: number;
  sunIntensity?: number;
  shadowStrength?: number;
  silverLining?: number;
  phaseAnisotropy?: number;
  lightStep?: number;
  cloudContrast?: number;
  warmTint?: number;
  parallaxIntensity?: number;
  distortionStrength?: number;
  noiseScale?: number;
  style?: React.CSSProperties;
  className?: string;
}

function MorphingCrystalCanvas({
  text,
  font,
  padding = DEFAULT_PADDING,
  cloudDensity = 0.55,
  cloudSpeed = 0.3,
  dynamicity = 0.65,
  turbulence = 1.25,
  thickness = 0.09,
  edgeSoftness = 1.4,
  bevelStrength = 0.0,
  sunIntensity = 0.6,
  shadowStrength = 0.6,
  silverLining = 0.62,
  phaseAnisotropy = 0.6,
  lightStep = 0.018,
  cloudContrast = 1.18,
  warmTint = 0.62,
  parallaxIntensity = 0.38,
  distortionStrength = 0.065,
  noiseScale = 1.0,
  style,
  className,
}: MorphingCrystalProps) {
  const interaction = useShaderInteractionUniforms();
  const containerRef = useRef<HTMLDivElement>(null);
  const aspectRatioRef = useRef(1);
  const cloudDensityRef = useRef(cloudDensity);
  const cloudSpeedRef = useRef(cloudSpeed);
  const dynamicityRef = useRef(dynamicity);
  const turbulenceRef = useRef(turbulence);
  const thicknessRef = useRef(thickness);
  const edgeSoftnessRef = useRef(edgeSoftness);
  const bevelStrengthRef = useRef(bevelStrength);
  const sunIntensityRef = useRef(sunIntensity);
  const shadowStrengthRef = useRef(shadowStrength);
  const silverLiningRef = useRef(silverLining);
  const phaseAnisotropyRef = useRef(phaseAnisotropy);
  const lightStepRef = useRef(lightStep);
  const cloudContrastRef = useRef(cloudContrast);
  const warmTintRef = useRef(warmTint);
  const parallaxIntensityRef = useRef(parallaxIntensity);
  const distortionStrengthRef = useRef(distortionStrength);
  const noiseScaleRef = useRef(noiseScale);
  cloudDensityRef.current = cloudDensity;
  cloudSpeedRef.current = cloudSpeed;
  dynamicityRef.current = dynamicity;
  turbulenceRef.current = turbulence;
  thicknessRef.current = thickness;
  edgeSoftnessRef.current = edgeSoftness;
  bevelStrengthRef.current = bevelStrength;
  sunIntensityRef.current = sunIntensity;
  shadowStrengthRef.current = shadowStrength;
  silverLiningRef.current = silverLining;
  phaseAnisotropyRef.current = phaseAnisotropy;
  lightStepRef.current = lightStep;
  cloudContrastRef.current = cloudContrast;
  warmTintRef.current = warmTint;
  parallaxIntensityRef.current = parallaxIntensity;
  distortionStrengthRef.current = distortionStrength;
  noiseScaleRef.current = noiseScale;

  const timeRef = useRef(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      timeRef.current = performance.now() / 1000;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (height > 0) aspectRatioRef.current = width / height;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const uniformBindings = useRef(
    U.createBindings({
      time: () => timeRef.current,
      cloudDensity: () => cloudDensityRef.current,
      cloudSpeed: () => cloudSpeedRef.current,
      dynamicity: () => dynamicityRef.current,
      turbulence: () => turbulenceRef.current,
      thickness: () => thicknessRef.current,
      edgeSoftness: () => edgeSoftnessRef.current,
      bevelStrength: () => bevelStrengthRef.current,
      sunIntensity: () => sunIntensityRef.current,
      shadowStrength: () => shadowStrengthRef.current,
      silverLining: () => silverLiningRef.current,
      phaseAnisotropy: () => phaseAnisotropyRef.current,
      lightStep: () => lightStepRef.current,
      cloudContrast: () => cloudContrastRef.current,
      warmTint: () => warmTintRef.current,
      parallaxIntensity: () => parallaxIntensityRef.current,
      distortionStrength: () => distortionStrengthRef.current,
      noiseScale: () => noiseScaleRef.current,
      aspectRatio: () => aspectRatioRef.current,
      mouseUV: interaction.mouseUV,
      isPointerActive: interaction.isPointerActive,
    }),
  );

  const source = useMemo(() => ({ type: 'text' as const, text, font }), [text, font]);

  return (
    <div ref={containerRef} style={{ display: 'inline-block' }}>
      <ShaderCanvas
        key={font.size}
        source={source}
        fragment={morphingCrystalFragment}
        uniformBindingsRef={uniformBindings}
        padding={padding}
        style={style}
        className={className}
      />
    </div>
  );
}

export function MorphingCrystal(props: MorphingCrystalProps) {
  return (
    <InteractionArea style={{ display: 'inline-block' }}>
      <MorphingCrystalCanvas {...props} />
    </InteractionArea>
  );
}
