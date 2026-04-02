import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS } from "../theme";

const nodes = [
  {
    icon: "RPi",
    name: "Raspberry Pi",
    detail: "$60 sovereign compute",
    color: "#ef4444",
  },
  {
    icon: "Mac",
    name: "MacBook",
    detail: "Local LLMs, no API keys",
    color: "#3b82f6",
  },
  {
    icon: "GPU",
    name: "GPU Workstation",
    detail: "70B+ parameter models",
    color: "#f97316",
  },
  {
    icon: "VPS",
    name: "Cloud VPS",
    detail: "Burst capacity you own",
    color: "#10b981",
  },
];

export const SceneHardware = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 15], [-30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        padding: 60,
        justifyContent: "center",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: COLORS.accent,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 16,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Any Hardware
      </div>
      <div
        style={{
          fontSize: 48,
          fontWeight: 900,
          color: COLORS.white,
          marginBottom: 48,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          letterSpacing: -1,
        }}
      >
        Fully Sovereign.
      </div>

      {/* Hardware cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {nodes.map((node, i) => {
          const delay = 15 + i * 8;
          const slideProgress = spring({
            frame,
            fps,
            delay,
            config: { damping: 200 },
          });
          const x = interpolate(slideProgress, [0, 1], [120, 0]);
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
                gap: 24,
                backgroundColor: COLORS.bgCard,
                borderRadius: 20,
                padding: "24px 32px",
                border: `1px solid ${COLORS.gray800}`,
                transform: `translateX(${x}px)`,
                opacity,
              }}
            >
              {/* Icon badge */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  backgroundColor: `${node.color}20`,
                  border: `2px solid ${node.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 800,
                  color: node.color,
                  flexShrink: 0,
                }}
              >
                {node.icon}
              </div>

              <div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: COLORS.white,
                  }}
                >
                  {node.name}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 400,
                    color: COLORS.gray400,
                    marginTop: 2,
                  }}
                >
                  {node.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
