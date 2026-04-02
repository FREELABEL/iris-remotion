import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z } from "zod";
import { BRANDS, NEUTRAL, type BrandConfig } from "../brands";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const EventFlyerStillSchema = z.object({
  brand: z.string(),
  preHeadline: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  callouts: z.array(
    z.object({
      text: z.string(),
      x: z.number(),
      y: z.number(),
      align: z.enum(["left", "right", "center"]).optional(),
    })
  ),
  date: z.string(),
  venue: z.string(),
  hostedBy: z.string(),
  url: z.string(),
  bgColor: z.string().optional(),
  glowColor: z.string().optional(),
});

export type EventFlyerStillProps = z.infer<typeof EventFlyerStillSchema>;

export const EventFlyerStill = ({
  brand,
  preHeadline,
  headline,
  subtitle,
  callouts,
  date,
  venue,
  hostedBy,
  url,
  bgColor,
  glowColor,
}: EventFlyerStillProps) => {
  const config: BrandConfig = BRANDS[brand] ?? BRANDS.freelabel;
  const bg = bgColor ?? "#050508";
  const glow = glowColor ?? config.accentColor;

  const headlineParts = headline.split("\n");
  const mainTitle = headlineParts[0];
  const accentLine = headlineParts[1] || "";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        fontFamily,
      }}
    >
      {/* === BACKGROUND PHOTO === */}
      <Img
        src={staticFile("song-wars-bg.jpg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            to bottom,
            ${bg}ee 0%,
            ${bg}cc 25%,
            ${bg}aa 45%,
            ${bg}bb 65%,
            ${bg}ee 80%,
            ${bg}ff 100%
          )`,
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          width: 1800,
          height: 1800,
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glow}20 0%, transparent 55%)`,
          filter: "blur(200px)",
        }}
      />

      {/* Top glow */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: 800,
          top: -100,
          background: `radial-gradient(ellipse at 50% 0%, ${glow}18 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.07,
          backgroundImage: `
            linear-gradient(${glow} 1px, transparent 1px),
            linear-gradient(90deg, ${glow} 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* FL logo — top center */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <Img
          src={staticFile("freelabel-logo-full-text.png")}
          style={{
            height: 100,
            width: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* === TOP SECTION: PRESENTER + BIG TITLE === */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 3,
        }}
      >
        {/* Presenter */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: NEUTRAL.gray300,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          {preHeadline}
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 220,
            fontWeight: 900,
            color: NEUTRAL.white,
            letterSpacing: -10,
            lineHeight: 0.9,
            textAlign: "center",
            textTransform: "uppercase",
            textShadow: `0 8px 80px ${glow}40, 0 0 160px ${glow}20`,
            marginTop: 8,
          }}
        >
          {mainTitle}
        </div>

        {/* Accent line (LIVE ATX) — gold */}
        {accentLine && (
          <div
            style={{
              fontSize: 160,
              fontWeight: 900,
              color: "#f5c518",
              letterSpacing: 8,
              lineHeight: 1,
              textAlign: "center",
              textTransform: "uppercase",
              textShadow: "0 0 80px rgba(245,197,24,0.35)",
              marginTop: -8,
            }}
          >
            {accentLine}
          </div>
        )}

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginTop: 32,
          }}
        >
          {subtitle.split("\n").map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: i === 1 ? "#f5c518" : NEUTRAL.white,
                letterSpacing: 2,
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* === CALLOUTS === */}
      {callouts.map((callout, i) => {
        const lines = callout.text.split("\n");
        const isBigNumber = lines[0].length <= 3;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${callout.x}%`,
              top: `${callout.y}%`,
              transform:
                callout.align === "right"
                  ? "translateX(-100%)"
                  : callout.align === "center"
                  ? "translateX(-50%)"
                  : "none",
              zIndex: 4,
            }}
          >
            {lines.map((line, j) => (
              <div
                key={j}
                style={{
                  fontSize: isBigNumber && j === 0 ? 144 : 64,
                  fontWeight: 900,
                  color: NEUTRAL.white,
                  lineHeight: isBigNumber && j === 0 ? 0.9 : 1.1,
                  textAlign: callout.align ?? "left",
                  textTransform: "uppercase",
                  textShadow: "0 4px 40px rgba(0,0,0,0.5)",
                }}
              >
                {line}
              </div>
            ))}
          </div>
        );
      })}

      {/* === BOTTOM: SUBMIT CTA + TWITCH BAR === */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          zIndex: 3,
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 800, color: NEUTRAL.white, letterSpacing: 2, textAlign: "center" }}>
          {date}
        </div>
        <div style={{ fontSize: 32, fontWeight: 600, color: NEUTRAL.gray400, letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>
          {venue}
        </div>
        <div style={{ fontSize: 36, fontWeight: 700, color: "#f5c518", letterSpacing: 8, textTransform: "uppercase" }}>
          Slots going fast
        </div>
        <div style={{ fontSize: 56, fontWeight: 900, color: NEUTRAL.white, letterSpacing: 0, textTransform: "uppercase" }}>
          Submit your song @ {url}
        </div>
        <div style={{ fontSize: 36, fontWeight: 600, color: NEUTRAL.gray400, letterSpacing: 6, textTransform: "uppercase", marginTop: 4 }}>
          Watch live on Twitch
        </div>
      </div>

      {/* Twitch bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          background: "linear-gradient(135deg, #1a0a2e 0%, #2d1050 50%, #1a0a2e 100%)",
          borderTop: "6px solid #9146ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 16,
            backgroundColor: "#9146ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            fontWeight: 900,
            color: NEUTRAL.white,
          }}
        >
          {"▶"}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: NEUTRAL.white,
            letterSpacing: -1,
          }}
        >
          {hostedBy}
        </div>
      </div>
    </AbsoluteFill>
  );
};
