import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, SIZES } from "../theme";

export const SceneReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale-in with spring
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  // Logo glow expanding
  const glowSize = interpolate(frame, [0, 40], [100, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowOpacity = interpolate(frame, [0, 20, 40], [0, 0.6, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle entrance
  const subDelay = 25;
  const subOpacity = interpolate(frame, [subDelay, subDelay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [subDelay, subDelay + 15], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline
  const tagDelay = 45;
  const tagOpacity = interpolate(frame, [tagDelay, tagDelay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent lines
  const lineWidth = interpolate(frame, [35, 60], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ambient glow pulse
  const ambientPulse = Math.sin(frame * 0.05) * 0.15 + 0.5;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: SIZES.padding,
      }}
    >
      {/* Ambient red glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.redDim}${Math.round(ambientPulse * 255).toString(16).padStart(2, "0")} 0%, transparent 60%)`,
          filter: "blur(100px)",
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.red}06 1px, transparent 1px), linear-gradient(90deg, ${COLORS.red}06 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Logo burst glow */}
      <div
        style={{
          position: "absolute",
          width: glowSize,
          height: glowSize,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.red}60 0%, transparent 70%)`,
          opacity: glowOpacity,
          filter: "blur(40px)",
        }}
      />

      <div style={{ textAlign: "center", zIndex: 1 }}>
        {/* FREELABEL logo image */}
        <Img
          src={staticFile("freelabel-logo.png")}
          style={{
            width: 600,
            height: "auto",
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 0 40px ${COLORS.red}40)`,
          }}
        />

        {/* Accent lines */}
        <div style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}>
          <div
            style={{
              width: lineWidth,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${COLORS.red}, transparent)`,
            }}
          />
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: COLORS.red,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          Sovereign Cloud
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 400,
            color: COLORS.gray400,
            marginTop: 16,
            opacity: tagOpacity,
          }}
        >
          For Independent Artists & Labels
        </div>
      </div>
    </AbsoluteFill>
  );
};
