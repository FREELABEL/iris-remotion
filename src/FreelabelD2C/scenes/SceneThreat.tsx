import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, SIZES } from "../theme";

const platforms = [
  { name: "Spotify", cut: "70%", youGet: "~$0.003/stream", icon: "🎧" },
  { name: "Apple Music", cut: "65%", youGet: "~$0.006/stream", icon: "🍎" },
  { name: "YouTube", cut: "55%", youGet: "~$0.002/view", icon: "▶️" },
];

const acquisitions = [
  { name: "CD Baby → Sold to UMG", year: "2023" },
  { name: "Even D2C → Shut Down", year: "2024" },
  { name: "Stationhead → Acquired", year: "2024" },
];

export const SceneThreat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 15], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Warning indicator flash
  const warningFlash =
    frame > 5 ? Math.sin(frame * 0.15) * 0.3 + 0.7 : 0;

  // Phase 2 transition (acquisitions appear after platforms)
  const phase2Start = 85;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: SIZES.padding,
      }}
    >
      {/* Muted threat glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.threatDim}30 0%, transparent 60%)`,
          filter: "blur(100px)",
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

      <div style={{ zIndex: 1, width: "100%" }}>
        {/* Warning badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: COLORS.red,
              opacity: warningFlash,
              boxShadow: `0 0 20px ${COLORS.red}80`,
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: COLORS.red,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            The Real Cost
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: COLORS.white,
            textAlign: "center",
            letterSpacing: -2,
            marginBottom: 36,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          They Keep <span style={{ color: COLORS.red }}>90%+</span>
          <br />
          <span style={{ fontSize: 28, color: COLORS.gray400, fontWeight: 600 }}>
            for tech YOU are enabling
          </span>
        </div>

        {/* Platform revenue cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            alignItems: "center",
          }}
        >
          {platforms.map((platform, i) => {
            const delay = 20 + i * 16;
            const cardScale = spring({
              frame: frame - delay,
              fps,
              config: { damping: 14, stiffness: 180 },
            });
            const cardOpacity = interpolate(
              frame,
              [delay, delay + 10],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={platform.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "16px 32px",
                  width: 680,
                  opacity: cardOpacity,
                  transform: `scale(${cardScale})`,
                }}
              >
                <span style={{ fontSize: 28, minWidth: 40 }}>{platform.icon}</span>

                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.white,
                    flex: 1,
                  }}
                >
                  {platform.name}
                </span>

                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: COLORS.red,
                    }}
                  >
                    keeps {platform.cut}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: COLORS.gray500,
                    }}
                  >
                    you get {platform.youGet}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Phase 2: Acquisition ticker */}
        <div
          style={{
            marginTop: 30,
            textAlign: "center",
            opacity: interpolate(frame, [phase2Start, phase2Start + 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: COLORS.threat,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Meanwhile, your tools disappear
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
            }}
          >
            {acquisitions.map((acq, i) => {
              const acqDelay = phase2Start + 10 + i * 12;
              const acqOpacity = interpolate(
                frame,
                [acqDelay, acqDelay + 10],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <div
                  key={acq.name}
                  style={{
                    opacity: acqOpacity,
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.gray500,
                    padding: "8px 16px",
                    textDecoration: "line-through",
                    textDecorationColor: COLORS.threat,
                  }}
                >
                  {acq.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
