import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

import { COLORS } from "./theme";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
});

export const FreelabelD2CThumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Red glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.redDim}40 0%, transparent 60%)`,
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

      <div style={{ textAlign: "center", zIndex: 1 }}>
        {/* Headline */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 900,
            color: COLORS.white,
            letterSpacing: -2,
            lineHeight: 1.15,
            marginBottom: 30,
          }}
        >
          Stop Renting
          <br />
          <span style={{ color: COLORS.red }}>Your Fanbase.</span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 200,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.red}, transparent)`,
            margin: "24px auto",
          }}
        />

        {/* FREELABEL Logo */}
        <Img
          src={staticFile("freelabel-logo.png")}
          style={{
            width: 440,
            height: "auto",
            marginBottom: 30,
            filter: `drop-shadow(0 0 30px ${COLORS.red}30)`,
          }}
        />

        {/* CTA Button */}
        <div
          style={{
            display: "inline-block",
            background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.redDim})`,
            borderRadius: 50,
            padding: "18px 52px",
            fontSize: 26,
            fontWeight: 800,
            color: COLORS.white,
            boxShadow: `0 0 30px ${COLORS.red}50, 0 4px 16px ${COLORS.redDim}60`,
          }}
        >
          Claim Your Cloud
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: COLORS.white,
            marginTop: 22,
            letterSpacing: 2,
          }}
        >
          freelabel.net
        </div>
      </div>
    </AbsoluteFill>
  );
};
