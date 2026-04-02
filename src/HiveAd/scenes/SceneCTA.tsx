import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS } from "../theme";

export const SceneCTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  // CTA button entrance
  const ctaProgress = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 200 },
  });
  const ctaY = interpolate(ctaProgress, [0, 1], [40, 0]);
  const ctaOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL entrance
  const urlOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow on CTA
  const glowIntensity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.4, 0.8]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}18 0%, transparent 60%)`,
          filter: "blur(100px)",
        }}
      />

      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `
            linear-gradient(${COLORS.accent} 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.accent} 1px, transparent 1px)
          `,
          backgroundSize: "54px 54px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Sparkle + IRIS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            transform: `scale(${logoScale})`,
          }}
        >
          <span
            style={{
              fontSize: 28,
              color: COLORS.accent,
            }}
          >
            &#10022;
          </span>
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 6,
              color: COLORS.gray400,
              textTransform: "uppercase",
            }}
          >
            IRIS
          </span>
        </div>

        {/* Hive */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: COLORS.white,
            letterSpacing: -2,
            transform: `scale(${logoScale})`,
          }}
        >
          Hive
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 24,
            transform: `translateY(${ctaY}px)`,
            opacity: ctaOpacity,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDim})`,
              borderRadius: 16,
              padding: "22px 60px",
              fontSize: 28,
              fontWeight: 800,
              color: COLORS.white,
              letterSpacing: 1,
              boxShadow: `0 0 ${40 * glowIntensity}px ${COLORS.accent}60`,
            }}
          >
            Claim Your Stack
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: COLORS.gray400,
            letterSpacing: 2,
            marginTop: 16,
            opacity: urlOpacity,
          }}
        >
          heyiris.io/hive
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: COLORS.gray600,
            marginTop: 8,
            opacity: urlOpacity,
          }}
        >
          Your servers. Your models. Your compute.
        </div>
      </div>
    </AbsoluteFill>
  );
};
