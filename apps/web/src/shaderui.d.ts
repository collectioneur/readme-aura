declare module 'shaderui' {
  import type React from 'react'

  export interface FontConfig {
    family: string
    size: number
    weight?: number
    style?: string
  }

  export interface Padding {
    paddingTop: number
    paddingRight: number
    paddingBottom: number
    paddingLeft: number
  }

  export interface UniformControlMeta {
    editable: boolean
    kind?: string
    label?: string
    min?: number
    max?: number
    step?: number
    group?: string
    decimals?: number
  }

  export interface UniformSpec<T = any> {
    schema: T
    value: any
    control: UniformControlMeta
  }

  export interface DefineUniformsResult<T extends Record<string, UniformSpec>> {
    $: { [K in keyof T]: any }
    specs: T
    createBindings: (bindings: { [K in keyof T]: (() => any) | any }) => React.MutableRefObject<any>
  }

  export function defineUniforms<T extends Record<string, UniformSpec>>(
    specs: T
  ): DefineUniformsResult<T> & { createBindings: (bindings: Record<string, (() => any) | any>) => any }

  export interface ShaderCanvasProps {
    source: { type: 'text'; text: string; font: FontConfig } | { type: 'canvas'; canvas: HTMLCanvasElement }
    fragment: any
    uniformBindingsRef: React.MutableRefObject<any>
    padding?: Partial<Padding>
    style?: React.CSSProperties
    className?: string
  }

  export function ShaderCanvas(props: ShaderCanvasProps): React.ReactElement

  export interface InteractionAreaProps {
    children: React.ReactNode
    style?: React.CSSProperties
    className?: string
  }

  export function InteractionArea(props: InteractionAreaProps): React.ReactElement

  export interface InteractionUniforms {
    mouseUV: () => any
    isPointerActive: () => any
  }

  export function useShaderInteractionUniforms(): InteractionUniforms
  export function useInteraction(): any
  export function createShaderInteractionGetters(): any

  export const distSampleLayout: {
    $: {
      distTexture: any
      sampler: any
    }
  }

  export const OFFSCREEN_POINTER_UV: any

  export function createSDFPipeline(...args: any[]): any
  export function getSize(...args: any[]): any
  export function getMaskData(...args: any[]): any
  export const distanceFrag: any
  export const paramsAccessor: any
  export const timeAccessor: any

  export type SDFPipelineRoot = any
  export type UniformBinding = any
  export type VisualizationParams = any
  export type MaskSource = any
  export type InteractionSnapshot = any
  export type InteractionPointerTypeCode = any
}
