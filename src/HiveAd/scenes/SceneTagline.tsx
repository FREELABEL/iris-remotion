import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS } from "../theme";

const lines = [
  "Your private cloud.",
  "Your AI.",
  "Your rules.",
];

export const SceneTagline = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Background accent line */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: "30%",
          bottom: "30%",
          width: 4,
          background: `linear-gradient(to bottom, transparent, ${COLORS.accent}, transparent)`,
          opacity: interpolate(frame, [0, 20], [0, 0.6], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "flex-start",
          width: "100%",
          paddingLeft: 40,
        }}
      >
        {lines.map((line, i) => {
          const delay = i * 12;
          const progress = spring({
            frame,
            fps,
            delay,
            config: { damping: 200 },
          });
          const x = interpolate(progress, [0, 1], [-60, 0]);
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                fontSize: i === 2 ? 72 : 64,
                fontWeight: i === 2 ? 900 : 700,
                color: i === 2 ? COLORS.accent : COLORS.white,
                transform: `translateX(${x}px)`,
                opacity,
                letterSpacing: -1,
              }}
            >
              {line}
            </div>
          );
        })}

        {/* Subtext */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: COLORS.gray400,
            maxWidth: 700,
            lineHeight: 1.6,
            marginTop: 24,
            opacity: interpolate(frame, [50, 65], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [50, 65], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          Turn every server you own into a sovereign compute node
        </div>
      </div>
    </AbsoluteFill>
  );
};
