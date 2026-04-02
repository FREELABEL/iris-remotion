import {
  AbsoluteFill,
  Img,
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
import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z } from "zod";
import { BRANDS, NEUTRAL, type BrandConfig } from "../brands";
import { SIZES } from "./theme";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const SocialPostSchema = z.object({
  brand: z.string(),
  headline: z.string(),
  roles: z.array(z.string()),
  eventInfo: z.string(),
  ctaText: z.string(),
  contactHandle: z.string(),
  slowZoom: z.boolean().optional(),
});

export type SocialPostProps = z.infer<typeof SocialPostSchema>;

/* ─── Scene 1: Brand Logo + Headline ─── */
const SceneBrand = ({
  config,
  headline,
  enableZoom,
}: {
  config: BrandConfig;
  headline: string;
  enableZoom: boolean;
}) => {
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headlineOpacity = interpolate(frame, [18, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const zoom = enableZoom
    ? interpolate(frame, [0, 300], [1.0, 1.2], { extrapolateRight: "clamp" })
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${config.accentColor}33 0%, transparent 70%)`,
          filter: "blur(80px)",
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          marginTop: -64,
          transform: `scale(${zoom})`,
        }}
      >
        {/* Logo */}
        {config.logoFile ? (
          <Img
            src={staticFile(config.logoFile)}
            style={{
              width: 200,
              height: 200,
              objectFit: "contain",
              opacity: logoOpacity,
              filter: `drop-shadow(0 0 20px ${config.accentColor}40)`,
            }}
          />
        ) : (
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: 32,
              background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentGlow})`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: logoOpacity,
              fontSize: 56,
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
            fontSize: 64,
            fontWeight: 900,
            color: NEUTRAL.white,
            letterSpacing: -2,
            textAlign: "center",
            lineHeight: 1.1,
            opacity: headlineOpacity,
            maxWidth: 800,
          }}
        >
          {headline}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─── Scene 2: Roles Cascade ─── */
const SceneRoles = ({
  config,
  roles,
  enableZoom,
}: {
  config: BrandConfig;
  roles: string[];
  enableZoom: boolean;
}) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const zoom = enableZoom
    ? interpolate(frame, [0, 300], [1.0, 1.2], { extrapolateRight: "clamp" })
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
        padding: SIZES.padding,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${config.accentColor}25 0%, transparent 60%)`,
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          width: "100%",
          marginTop: -64,
          transform: `scale(${zoom})`,
        }}
      >
        {/* Section label */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: config.accentColor,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: titleOpacity,
          }}
        >
          JOIN OUR NETWORK
        </div>

        {/* Role items */}
        {roles.map((role, i) => {
          const delay = 8 + i * 12;
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={role}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity,
              }}
            >
              {/* Accent bar */}
              <div
                style={{
                  width: 5,
                  height: 50,
                  borderRadius: 3,
                  backgroundColor: config.accentColor,
                  boxShadow: `0 0 14px ${config.accentColor}60`,
                }}
              />
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 800,
                  color: NEUTRAL.white,
                  letterSpacing: -1,
                  textTransform: "uppercase",
                }}
              >
                {role}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ─── Scene 3: Event Info + CTA (merged) ─── */
const SceneClosing = ({
  config,
  eventInfo,
  ctaText,
  enableZoom,
}: {
  config: BrandConfig;
  eventInfo: string;
  ctaText: string;
  enableZoom: boolean;
}) => {
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const eventOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dividerOpacity = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [26, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const urlOpacity = interpolate(frame, [34, 46], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const zoom = enableZoom
    ? interpolate(frame, [0, 300], [1.0, 1.2], { extrapolateRight: "clamp" })
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          marginTop: -64,
          transform: `scale(${zoom})`,
        }}
      >
        {/* FL Logo */}
        <div
          style={{
            width: 80,
            height: 80,
            overflow: "hidden",
            opacity: logoOpacity,
            filter: `drop-shadow(0 0 20px ${config.accentColor}40)`,
            marginBottom: 40,
            flexShrink: 0,
          }}
        >
          <Img
            src={staticFile("fllogo.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Event info */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: NEUTRAL.white,
            letterSpacing: -1,
            textAlign: "center",
            lineHeight: 1.2,
            opacity: eventOpacity,
          }}
        >
          {eventInfo}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 4,
            opacity: dividerOpacity,
            borderRadius: 2,
            backgroundColor: config.accentColor,
            boxShadow: `0 0 12px ${config.accentColor}50`,
          }}
        />

        {/* CTA text */}
        <div
          style={{
            fontSize: 38,
            fontWeight: 800,
            color: NEUTRAL.white,
            letterSpacing: -1,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: 700,
            opacity: ctaOpacity,
          }}
        >
          {ctaText.split(/(@\w+)/g).map((part, i) =>
            part.startsWith("@") ? (
              <span key={i} style={{ color: config.accentColor }}>{part}</span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>

        {/* URL */}
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

/* ─── Scene 4: Credit ─── */
const SceneCredit = ({ config, enableZoom }: { config: BrandConfig; enableZoom: boolean }) => {
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const zoom = enableZoom
    ? interpolate(frame, [0, 300], [1.0, 1.2], { extrapolateRight: "clamp" })
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
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

      <Img
        src={staticFile("freelabel-logo.png")}
        style={{
          width: 200,
          height: 200,
          objectFit: "contain",
          opacity: logoOpacity,
          transform: `scale(${zoom})`,
          filter: `drop-shadow(0 0 20px ${config.accentColor}40)`,
        }}
      />
    </AbsoluteFill>
  );
};

/* ─── Timing config (seconds) ─── */
const SCENE_DURATION = 3.13;
const ROLES_DURATION = 3.87;
const CLOSING_DURATION = 4.26;
const CREDIT_DURATION = 2;
const TRANSITION_FRAMES = 12;

/* ─── Main Composition ─── */
export const SocialPost = ({
  brand,
  headline,
  roles,
  eventInfo,
  ctaText,
  contactHandle,
  slowZoom = true,
}: SocialPostProps) => {
  const { fps } = useVideoConfig();
  const config: BrandConfig = BRANDS[brand] ?? BRANDS.freelabel;
  const enableZoom = slowZoom !== false;

  const scene = Math.round(SCENE_DURATION * fps);
  const rolesScene = Math.round(ROLES_DURATION * fps);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        fontFamily,
      }}
    >
      <TransitionSeries>
        {/* Scene 1: Brand + Headline */}
        <TransitionSeries.Sequence durationInFrames={scene}>
          <SceneBrand config={config} headline={headline} enableZoom={enableZoom} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 2: Roles */}
        <TransitionSeries.Sequence durationInFrames={rolesScene}>
          <SceneRoles config={config} roles={roles} enableZoom={enableZoom} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 3: Event Info + CTA (merged) */}
        <TransitionSeries.Sequence durationInFrames={Math.round(CLOSING_DURATION * fps)}>
          <SceneClosing config={config} eventInfo={eventInfo} ctaText={ctaText} enableZoom={enableZoom} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 4: Credit */}
        <TransitionSeries.Sequence durationInFrames={Math.round(CREDIT_DURATION * fps)}>
          <SceneCredit config={config} enableZoom={enableZoom} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Background audio */}
      <Audio
        src={staticFile("social-post-audio.mp3")}
        volume={0.8}
      />
    </AbsoluteFill>
  );
};
