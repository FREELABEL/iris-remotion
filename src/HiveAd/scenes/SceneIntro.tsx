import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { COLORS } from "../theme";

export const SceneIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // IRIS text entrance
  const irisScale = spring({ frame, fps, config: { damping: 200 } });
  const irisOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Sparkle entrance
  const sparkleScale = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 15, stiffness: 200 },
  });
  const sparkleRotation = interpolate(
    spring({ frame, fps, delay: 10, config: { damping: 200 } }),
    [0, 1],
    [0, 360]
  );

  // "Hive" text entrance (delayed)
  const hiveProgress = spring({
    frame,
    fps,
    delay: 25,
    config: { damping: 200 },
  });
  const hiveY = interpolate(hiveProgress, [0, 1], [40, 0]);
  const hiveOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle entrance
  const subOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [40, 55], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background glow pulse
  const glowPulse = interpolate(frame, [0, 90], [0.3, 0.6], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}${Math.round(glowPulse * 25).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Grid lines background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(${COLORS.accent} 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.accent} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* IRIS text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          transform: `scale(${irisScale})`,
          opacity: irisOpacity,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 8,
            color: COLORS.gray400,
            textTransform: "uppercase",
          }}
        >
          IRIS
        </div>
      </div>

      {/* Sparkle symbol */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          fontSize: 32,
          color: COLORS.accent,
          transform: `scale(${sparkleScale}) rotate(${sparkleRotation}deg)`,
          opacity: sparkleScale,
        }}
      >
        &#10022;
      </div>

      {/* Hive title */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: COLORS.white,
            letterSpacing: -2,
            transform: `translateY(${hiveY}px)`,
            opacity: hiveOpacity,
          }}
        >
          Hive
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: COLORS.gray400,
            letterSpacing: 4,
            textTransform: "uppercase",
            transform: `translateY(${subY}px)`,
            opacity: subOpacity,
            marginTop: 8,
          }}
        >
          Sovereign AI Infrastructure
        </div>
      </div>
    </AbsoluteFill>
  );
};
