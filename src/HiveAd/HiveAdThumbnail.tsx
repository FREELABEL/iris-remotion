import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { COLORS } from "./theme";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "900"],
  subsets: ["latin"],
});

export const HiveAdThumbnail = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}20 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Grid */}
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
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28, color: COLORS.accent }}>&#10022;</span>
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

        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: COLORS.white,
            letterSpacing: -2,
          }}
        >
          Hive
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: COLORS.gray400,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Sovereign AI Infrastructure
        </div>

        <div
          style={{
            marginTop: 32,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDim})`,
            borderRadius: 16,
            padding: "22px 60px",
            fontSize: 28,
            fontWeight: 800,
            color: COLORS.white,
            boxShadow: `0 0 30px ${COLORS.accent}40`,
          }}
        >
          Claim Your Stack
        </div>

        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: COLORS.gray400,
            letterSpacing: 2,
            marginTop: 12,
          }}
        >
          heyiris.io/hive
        </div>
      </div>
    </AbsoluteFill>
  );
};
