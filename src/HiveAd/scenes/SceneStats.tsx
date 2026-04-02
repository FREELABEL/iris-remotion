import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS } from "../theme";

const stats = [
  { value: "100%", label: "Data stays on your hardware", color: COLORS.green },
  { value: "Zero", label: "Third-party servers required", color: COLORS.accent },
  { value: "100+", label: "Nodes per Hive", color: COLORS.blue },
  { value: "Zero", label: "Vendor lock-in", color: COLORS.orange },
];

export const SceneStats = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `
            linear-gradient(${COLORS.accent} 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.accent} 1px, transparent 1px)
          `,
          backgroundSize: "54px 54px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          width: "100%",
        }}
      >
        {stats.map((stat, i) => {
          const delay = i * 10;
          const scaleProgress = spring({
            frame,
            fps,
            delay,
            config: { damping: 15, stiffness: 200 },
          });
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Counter animation for numeric values
          const counterProgress = interpolate(
            frame,
            [delay + 5, delay + 30],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          const displayValue = stat.value;

          return (
            <div
              key={i}
              style={{
                backgroundColor: COLORS.bgCard,
                borderRadius: 24,
                padding: 40,
                border: `1px solid ${COLORS.gray800}`,
                transform: `scale(${scaleProgress})`,
                opacity,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: stat.color,
                  letterSpacing: -1,
                }}
              >
                {displayValue}
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  color: COLORS.gray400,
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
