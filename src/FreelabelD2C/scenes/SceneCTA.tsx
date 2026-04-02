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

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 180 },
  });

  // Button entrance
  const btnDelay = 12;
  const btnScale = spring({
    frame: frame - btnDelay,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const btnOpacity = interpolate(frame, [btnDelay, btnDelay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Button glow pulse
  const glowPulse = Math.sin(frame * 0.1) * 0.4 + 0.6;

  // URL entrance
  const urlDelay = 22;
  const urlOpacity = interpolate(frame, [urlDelay, urlDelay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline
  const tagDelay = 30;
  const tagOpacity = interpolate(frame, [tagDelay, tagDelay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ambient glow
  const ambientPulse = Math.sin(frame * 0.06) * 0.2 + 0.5;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: SIZES.padding,
      }}
    >
      {/* Dual glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.redDim}${Math.round(ambientPulse * 255).toString(16).padStart(2, "0")} 0%, ${COLORS.purple}10 40%, transparent 60%)`,
          filter: "blur(100px)",
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.red}04 1px, transparent 1px), linear-gradient(90deg, ${COLORS.red}04 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {/* FREELABEL logo — centered */}
        <Img
          src={staticFile("freelabel-logo.png")}
          style={{
            width: 460,
            height: "auto",
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 0 30px ${COLORS.red}30)`,
          }}
        />

        {/* Spacer */}
        <div style={{ height: 50 }} />

        {/* CTA Button — centered */}
        <div
          style={{
            opacity: btnOpacity,
            transform: `scale(${Math.min(btnScale, 1)})`,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.redDim})`,
              borderRadius: 60,
              padding: "22px 64px",
              fontSize: 32,
              fontWeight: 800,
              color: COLORS.white,
              letterSpacing: 1,
              textAlign: "center",
              boxShadow: `0 0 ${40 * glowPulse}px ${COLORS.red}${Math.round(glowPulse * 100).toString(16).padStart(2, "0")}, 0 4px 20px ${COLORS.redDim}60`,
            }}
          >
            Claim Your Cloud
          </div>
        </div>

        {/* URL — centered */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: COLORS.white,
            marginTop: 28,
            opacity: urlOpacity,
            letterSpacing: 2,
            textAlign: "center",
          }}
        >
          freelabel.net
        </div>

        {/* Bottom tagline — centered */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: COLORS.gray400,
            marginTop: 24,
            opacity: tagOpacity,
            textAlign: "center",
          }}
        >
          Your fans. Your revenue.{" "}
          <span style={{ color: COLORS.red, fontWeight: 700 }}>
            Your future.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
