import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z } from "zod";
import { BRANDS, NEUTRAL, type BrandConfig } from "../brands";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const ClipPostSchema = z.object({
  brand: z.string(),
  headline: z.string(),
  subheadline: z.string().optional(),
  clipSrc: z.string(),
  clipDurationInSeconds: z.number(),
});

export type ClipPostProps = z.infer<typeof ClipPostSchema>;

/* ─── Shared background layer ─── */
const BrandBackground = ({ config }: { config: BrandConfig }) => (
  <>
    {/* Radial glow */}
    <div
      style={{
        position: "absolute",
        width: 700,
        height: 700,
        borderRadius: "50%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${config.accentColor}33 0%, transparent 60%)`,
        filter: "blur(100px)",
      }}
    />
    {/* Grid */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.12,
        backgroundImage: `
          linear-gradient(${config.accentColor} 1px, transparent 1px),
          linear-gradient(90deg, ${config.accentColor} 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  </>
);

/* ─── Scene 1: Intro — Brand + Headline ─── */
const SceneIntro = ({
  config,
  headline,
  subheadline,
}: {
  config: BrandConfig;
  headline: string;
  subheadline?: string;
}) => {
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headlineOpacity = interpolate(frame, [18, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      <BrandBackground config={config} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          zIndex: 1,
        }}
      >
        {/* Logo */}
        {config.logoFile ? (
          <Img
            src={staticFile(config.logoFile)}
            style={{
              width: 160,
              height: 160,
              objectFit: "contain",
              opacity: logoOpacity,
              filter: `drop-shadow(0 0 20px ${config.accentColor}40)`,
            }}
          />
        ) : (
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: 28,
              background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentGlow})`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: logoOpacity,
              fontSize: 48,
              fontWeight: 900,
              color: NEUTRAL.white,
              boxShadow: `0 0 40px ${config.accentColor}40`,
            }}
          >
            {config.brandName.charAt(0)}
          </div>
        )}

        {/* Headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: NEUTRAL.white,
            letterSpacing: -2,
            textAlign: "center",
            lineHeight: 1.15,
            opacity: headlineOpacity,
            maxWidth: 800,
          }}
        >
          {headline}
        </div>

        {/* Subheadline */}
        {subheadline && (
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: config.accentColor,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: subOpacity,
            }}
          >
            {subheadline}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

/* ─── Scene 2: Clip with branded frame ─── */
const SceneClip = ({
  config,
  clipSrc,
}: {
  config: BrandConfig;
  clipSrc: string;
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const clipOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Video fills most of the frame with a branded border
  const padding = 40;
  const videoWidth = width - padding * 2;
  const videoHeight = height - padding * 2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      <BrandBackground config={config} />

      {/* Video container with accent border */}
      <div
        style={{
          width: videoWidth,
          height: videoHeight,
          borderRadius: 12,
          overflow: "hidden",
          opacity: clipOpacity,
          zIndex: 1,
          border: `2px solid ${config.accentColor}30`,
          boxShadow: `0 0 40px ${config.accentColor}20`,
        }}
      >
        <OffthreadVideo
          src={clipSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/* ─── Scene 3: Outro — Logo credit ─── */
const SceneOutro = ({ config }: { config: BrandConfig }) => {
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const urlOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      <BrandBackground config={config} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          zIndex: 1,
        }}
      >
        <Img
          src={staticFile("freelabel-logo.png")}
          style={{
            width: 200,
            height: 200,
            objectFit: "contain",
            opacity: logoOpacity,
            filter: `drop-shadow(0 0 20px ${config.accentColor}40)`,
          }}
        />

        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: config.accentColor,
            letterSpacing: 2,
            opacity: urlOpacity,
          }}
        >
          {config.ctaUrl.toUpperCase()}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─── Timing ─── */
const INTRO_DURATION = 3; // seconds
const OUTRO_DURATION = 2; // seconds
const TRANSITION_FRAMES = 12;

/* ─── Main Composition ─── */
export const ClipPost = ({
  brand,
  headline,
  subheadline,
  clipSrc,
  clipDurationInSeconds,
}: ClipPostProps) => {
  const { fps } = useVideoConfig();
  const config: BrandConfig = BRANDS[brand] ?? BRANDS.freelabel;

  const introFrames = Math.round(INTRO_DURATION * fps);
  const clipFrames = Math.round(clipDurationInSeconds * fps);
  const outroFrames = Math.round(OUTRO_DURATION * fps);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        fontFamily,
      }}
    >
      <TransitionSeries>
        {/* Scene 1: Intro */}
        <TransitionSeries.Sequence durationInFrames={introFrames}>
          <SceneIntro
            config={config}
            headline={headline}
            subheadline={subheadline}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 2: Clip */}
        <TransitionSeries.Sequence durationInFrames={clipFrames}>
          <SceneClip config={config} clipSrc={clipSrc} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 3: Outro */}
        <TransitionSeries.Sequence durationInFrames={outroFrames}>
          <SceneOutro config={config} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
