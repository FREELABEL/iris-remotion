import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, SIZES } from "../theme";

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Stop Renting" slams in
  const line1Scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const line1Opacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  // "Your Fanbase." slides up
  const line2Y = interpolate(frame, [12, 28], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Opacity = interpolate(frame, [12, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Divider line
  const dividerWidth = interpolate(frame, [35, 55], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle
  const subOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [50, 65], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background pulse
  const pulse = Math.sin(frame * 0.04) * 0.15 + 0.35;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: SIZES.padding,
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.redDim}${Math.round(pulse * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.gray600}08 1px, transparent 1px), linear-gradient(90deg, ${COLORS.gray600}08 1px, transparent 1px)`,
          backgroundSize: "54px 54px",
        }}
      />

      <div style={{ textAlign: "center", zIndex: 1 }}>
        {/* "Stop Renting" */}
        <div
          style={{
            fontSize: 82,
            fontWeight: 900,
            color: COLORS.white,
            letterSpacing: -3,
            lineHeight: 1.1,
            transform: `scale(${line1Scale})`,
            opacity: line1Opacity,
          }}
        >
          Stop Renting
        </div>

        {/* "Your Fanbase." */}
        <div
          style={{
            fontSize: 82,
            fontWeight: 900,
            color: COLORS.red,
            letterSpacing: -3,
            lineHeight: 1.1,
            marginTop: 8,
            transform: `translateY(${line2Y}px)`,
            opacity: line2Opacity,
          }}
        >
          Your Fanbase.
        </div>

        {/* Divider */}
        <div
          style={{
            width: dividerWidth,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${COLORS.red}, transparent)`,
            margin: "30px auto",
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: COLORS.gray300,
            letterSpacing: 2,
            textTransform: "uppercase",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          Build Your Own Empire.
        </div>
      </div>
    </AbsoluteFill>
  );
};
