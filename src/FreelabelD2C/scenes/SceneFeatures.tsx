import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, SIZES } from "../theme";

const features = [
  { icon: "🤖", label: "AI Agents", sub: "24/7 marketing", color: COLORS.purple },
  { icon: "🌍", label: "50+ Platforms", sub: "No lock-in", color: COLORS.blue },
  { icon: "⭐", label: "Superfan Clubs", sub: "Own the data", color: COLORS.amber },
  { icon: "⚡", label: "Workflows", sub: "No-code builder", color: COLORS.cyan },
  { icon: "🛍️", label: "Storefront", sub: "Your domain", color: COLORS.red },
  { icon: "💎", label: "Zero Commission", sub: "Keep 100%", color: COLORS.amberGlow },
];

export const SceneFeatures: React.FC = () => {
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
      {/* Gradient glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.redDim}20 0%, ${COLORS.purple}10 50%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.gray600}05 1px, transparent 1px), linear-gradient(90deg, ${COLORS.gray600}05 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div style={{ zIndex: 1, width: "100%", textAlign: "center" }}>
        {/* Title */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: COLORS.white,
            letterSpacing: -2,
            marginBottom: 50,
            opacity: titleOpacity,
          }}
        >
          Everything You Need.
          <br />
          <span style={{ color: COLORS.red }}>Nothing You Don't Own.</span>
        </div>

        {/* 3x2 Feature grid — clean, no card backgrounds */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 30,
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          {features.map((feat, i) => {
            const delay = 10 + i * 10;
            const scale = spring({
              frame: frame - delay,
              fps,
              config: { damping: 14, stiffness: 180 },
            });
            const opacity = interpolate(
              frame,
              [delay, delay + 10],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={feat.label}
                style={{
                  padding: "20px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  opacity,
                  transform: `scale(${Math.min(scale, 1)})`,
                }}
              >
                {/* Icon */}
                <div style={{ fontSize: 36 }}>
                  {feat.icon}
                </div>

                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: COLORS.white,
                  }}
                >
                  {feat.label}
                </div>

                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: feat.color,
                  }}
                >
                  {feat.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
