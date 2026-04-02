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

export type BrandIntroProps = {
  brand: string;
};

/**
 * BrandIntro — 2.5s animated intro (75 frames @ 30fps)
 *
 * Timeline:
 *   0-30:  Logo scales in with spring + radial glow builds
 *  15-45:  Brand name fades in below logo
 *  35-60:  Tagline slides up
 *  55-75:  Everything fades to black
 */
export const BrandIntro = ({ brand }: BrandIntroProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const config: BrandConfig = BRANDS[brand] ?? BRANDS.discover;

  // Logo entrance — spring scale
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 180 },
  });
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Brand name entrance
  const nameProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 200 },
  });
  const nameY = interpolate(nameProgress, [0, 1], [30, 0]);
  const nameOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline entrance
  const taglineOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [35, 50], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade to black at end
  const fadeOut = interpolate(frame, [55, 75], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background glow builds
  const glowSize = interpolate(frame, [0, 40], [200, 600], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Radial accent glow */}
      <div
        style={{
          position: "absolute",
          width: glowSize,
          height: glowSize,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${config.accentColor}20 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Logo */}
        {config.logoFile ? (
          <Img
            src={staticFile(config.logoFile)}
            style={{
              width: 180,
              height: 180,
              objectFit: "contain",
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
            }}
          />
        ) : (
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 28,
              background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentGlow})`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
              fontSize: 48,
              fontWeight: 900,
              color: NEUTRAL.white,
              letterSpacing: -1,
            }}
          >
            {config.brandName.charAt(0)}
          </div>
        )}

        {/* Brand name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: NEUTRAL.white,
            letterSpacing: -1,
            transform: `translateY(${nameY}px)`,
            opacity: nameOpacity,
          }}
        >
          {config.brandName}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: NEUTRAL.gray400,
            letterSpacing: 3,
            textTransform: "uppercase",
            transform: `translateY(${taglineY}px)`,
            opacity: taglineOpacity,
          }}
        >
          {config.tagline}
        </div>
      </div>
    </AbsoluteFill>
  );
};
