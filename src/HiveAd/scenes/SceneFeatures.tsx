import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS } from "../theme";

const features = [
  { icon: "\uD83D\uDD12", text: "Prompts never leave your hardware" },
  { icon: "\uD83C\uDFAF", text: "Route work to the right machine" },
  { icon: "\uD83E\uDD16", text: "Run any open-source model" },
  { icon: "\uD83D\uDCCA", text: "Full-stack observability" },
  { icon: "\u26A1", text: "AI agents on your infrastructure" },
  { icon: "\u2601\uFE0F", text: "Cloud-optional, local-first" },
];

export const SceneFeatures = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        padding: 60,
        justifyContent: "center",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          right: -100,
          top: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}15 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: COLORS.accent,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 12,
          opacity: interpolate(frame, [0, 10], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Infrastructure You Own
      </div>
      <div
        style={{
          fontSize: 44,
          fontWeight: 900,
          color: COLORS.white,
          marginBottom: 40,
          letterSpacing: -1,
          opacity: interpolate(frame, [0, 10], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Every Feature. Your Terms.
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {features.map((feature, i) => {
          const delay = 8 + i * 5;
          const progress = spring({
            frame,
            fps,
            delay,
            config: { damping: 200 },
          });
          const scale = interpolate(progress, [0, 1], [0.8, 1]);
          const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                backgroundColor: COLORS.bgCard,
                borderRadius: 16,
                padding: "20px 24px",
                border: `1px solid ${COLORS.gray800}`,
                transform: `scale(${scale})`,
                opacity,
              }}
            >
              <span style={{ fontSize: 28 }}>{feature.icon}</span>
              <span
                style={{
                  fontSize: 19,
                  fontWeight: 600,
                  color: COLORS.gray100,
                  lineHeight: 1.3,
                }}
              >
                {feature.text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
