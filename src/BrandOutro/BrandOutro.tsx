import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
} from "remotion";
import { BRANDS, NEUTRAL, type BrandConfig } from "../brands";

export type BrandOutroProps = {
  brand: string;
};

/**
 * BrandOutro — 4s animated outro (120 frames @ 30fps)
 *
 * Timeline:
 *   0-10:   Fade from black
 *   5-30:   Logo + brand name scale in
 *  20-45:   Handle slides in
 *  35-65:   CTA button animates in with glow
 *  50-75:   URL fades in
 *  75-120:  Hold with pulsing glow, then gentle fade
 */
export const BrandOutro = ({ brand }: BrandOutroProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const config: BrandConfig = BRANDS[brand] ?? BRANDS.discover;

  // Fade from black at start
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Logo + brand name entrance
  const logoScale = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 14, stiffness: 160 },
  });
  const logoOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Handle slide in
  const handleProgress = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 200 },
  });
  const handleY = interpolate(handleProgress, [0, 1], [20, 0]);
  const handleOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA button entrance
  const ctaProgress = spring({
    frame,
    fps,
    delay: 35,
    config: { damping: 200 },
  });
  const ctaY = interpolate(ctaProgress, [0, 1], [30, 0]);
  const ctaOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL entrance
  const urlOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow on CTA button
  const glowIntensity = interpolate(
    Math.sin(frame * 0.07),
    [-1, 1],
    [0.3, 0.7]
  );

  // Subtle fade at very end
  const fadeEnd = interpolate(frame, [108, 120], [1, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn * fadeEnd,
      }}
    >
      {/* Background accent glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${config.accentColor}15 0%, transparent 60%)`,
          filter: "blur(100px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        {/* Logo */}
        {config.logoFile ? (
          <Img
            src={staticFile(config.logoFile)}
            style={{
              width: 160,
              height: 160,
              objectFit: "contain",
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
            }}
          />
        ) : (
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentGlow})`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
              fontSize: 42,
              fontWeight: 900,
              color: NEUTRAL.white,
            }}
          >
            {config.brandName.charAt(0)}
          </div>
        )}

        {/* Brand name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: NEUTRAL.white,
            letterSpacing: -1,
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        >
          {config.brandName}
        </div>

        {/* Handle */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: NEUTRAL.gray400,
            transform: `translateY(${handleY}px)`,
            opacity: handleOpacity,
          }}
        >
          {config.handle}
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 20,
            transform: `translateY(${ctaY}px)`,
            opacity: ctaOpacity,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentGlow})`,
              borderRadius: 16,
              padding: "20px 56px",
              fontSize: 28,
              fontWeight: 800,
              color: NEUTRAL.white,
              letterSpacing: 1,
              boxShadow: `0 0 ${36 * glowIntensity}px ${config.accentColor}60`,
            }}
          >
            {config.ctaText}
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: NEUTRAL.gray500,
            letterSpacing: 2,
            marginTop: 14,
            opacity: urlOpacity,
          }}
        >
          {config.ctaUrl}
        </div>
      </div>
    </AbsoluteFill>
  );
};
