import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, SIZES } from "../theme";

const pillars = [
  {
    icon: "🔒",
    title: "Your Data",
    desc: "On YOUR cloud",
    color: COLORS.red,
  },
  {
    icon: "💰",
    title: "Your Revenue",
    desc: "100%, always",
    color: COLORS.amber,
  },
  {
    icon: "👥",
    title: "Your Fans",
    desc: "No middlemen",
    color: COLORS.blue,
  },
  {
    icon: "🤖",
    title: "Your AI",
    desc: "Your brand only",
    color: COLORS.purple,
  },
  {
    icon: "🎵",
    title: "Your Distribution",
    desc: "No lock-in",
    color: COLORS.cyan,
  },
];

export const SceneSovereignty: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 15], [-20, 0], {
    extrapolateLeft: "clamp",
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
      {/* Red glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.redDim}25 0%, transparent 60%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.red}05 1px, transparent 1px), linear-gradient(90deg, ${COLORS.red}05 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div style={{ zIndex: 1, width: "100%", textAlign: "center" }}>
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 46,
              fontWeight: 800,
              color: COLORS.white,
              letterSpacing: -2,
            }}
          >
            What You Keep —
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: COLORS.red,
              letterSpacing: -2,
            }}
          >
            Everything.
          </div>
        </div>

        {/* Pillar rows — no card backgrounds */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            alignItems: "center",
            marginTop: 40,
          }}
        >
          {pillars.map((pillar, i) => {
            const delay = 20 + i * 14;
            const cardScale = spring({
              frame: frame - delay,
              fps,
              config: { damping: 15, stiffness: 200 },
            });
            const cardOpacity = interpolate(
              frame,
              [delay, delay + 10],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const cardX = interpolate(
              frame,
              [delay, delay + 12],
              [i % 2 === 0 ? -60 : 60, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={pillar.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "10px 32px",
                  width: 520,
                  opacity: cardOpacity,
                  transform: `scale(${Math.min(cardScale, 1)}) translateX(${cardX}px)`,
                }}
              >
                {/* Color bar */}
                <div
                  style={{
                    width: 4,
                    height: 40,
                    borderRadius: 2,
                    backgroundColor: pillar.color,
                    boxShadow: `0 0 12px ${pillar.color}60`,
                    flexShrink: 0,
                  }}
                />

                <span style={{ fontSize: 28, flexShrink: 0 }}>{pillar.icon}</span>

                <div style={{ flex: 1, textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 700,
                      color: COLORS.white,
                    }}
                  >
                    {pillar.title}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: pillar.color,
                      marginTop: 2,
                    }}
                  >
                    {pillar.desc}
                  </div>
                </div>

                {/* Check icon */}
                <div
                  style={{
                    fontSize: 22,
                    color: COLORS.red,
                    fontWeight: 900,
                    flexShrink: 0,
                    opacity: interpolate(
                      frame,
                      [delay + 18, delay + 25],
                      [0, 1],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }
                    ),
                  }}
                >
                  ✓
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
