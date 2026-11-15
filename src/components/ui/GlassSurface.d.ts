import { CSSProperties, ReactNode, RefObject } from "react";

type BlendMode = CSSProperties["mixBlendMode"];

export interface GlassSurfaceProps {
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: "R" | "G" | "B";
  yChannel?: "R" | "G" | "B";
  mixBlendMode?: BlendMode;
  refraction?: boolean;
  renderer?: "auto" | "svg" | "webgl";
  backdrop?: RefObject<HTMLImageElement | HTMLVideoElement | HTMLCanvasElement>;
  shape?: string;
  className?: string;
  style?: CSSProperties;
}

declare const GlassSurface: (props: GlassSurfaceProps) => JSX.Element;
export default GlassSurface;
