import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, SIZES } from "../theme";

const lostItems = [
  { label: "Your fan emails & data", icon: "📧" },
  { label: "Your revenue share", icon: "💸" },
  { label: "Your creative control", icon: "🎨" },
  { label: "Your D2C storefront", icon: "🏪" },
];

export const SceneStakes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: SIZES.padding,
      }}
    >
      {/* Dark vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, transparent 30%, ${COLORS.threatDim}15 100%)`,
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.gray600}06 1px, transparent 1px), linear-gradient(90deg, ${COLORS.gray600}06 1px, transparent 1px)`,
          backgroundSize: "54px 54px",
        }}
      />

      <div style={{ zIndex: 1, width: "100%", textAlign: "center" }}>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: COLORS.white,
            letterSpacing: -2,
            marginBottom: 60,
            opacity: titleOpacity,
          }}
        >
          What You <span style={{ color: COLORS.threat }}>Lose</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            alignItems: "center",
          }}
        >
          {lostItems.map((item, i) => {
            const delay = 15 + i * 18;

            // Slide in from right
            const itemX = interpolate(
              frame,
              [delay, delay + 15],
              [80, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const itemOpacity = interpolate(
              frame,
              [delay, delay + 12],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            // Cross-out
            const crossDelay = delay + 25;
            const crossProgress = interpolate(
              frame,
              [crossDelay, crossDelay + 12],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "20px 36px",
                  width: 620,
                  opacity: itemOpacity,
                  transform: `translateX(${itemX}px)`,
                  position: "relative",
                }}
              >
                {/* X mark */}
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: COLORS.threat,
                    minWidth: 36,
                    opacity: crossProgress,
                    transform: `scale(${crossProgress})`,
                  }}
                >
                  ✕
                </div>

                <span
                  style={{
                    fontSize: 20,
                    opacity: crossProgress > 0 ? 1 : 0,
                  }}
                >
                  {item.icon}
                </span>

                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 600,
                    color: crossProgress > 0.5 ? COLORS.gray500 : COLORS.white,
                    textDecoration:
                      crossProgress > 0.8 ? "line-through" : "none",
                    textDecorationColor: COLORS.threat,
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
