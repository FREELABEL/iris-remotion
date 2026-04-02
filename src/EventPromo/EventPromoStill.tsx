import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z } from "zod";
import { BRANDS, NEUTRAL, type BrandConfig } from "../brands";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const EventPromoStillSchema = z.object({
  brand: z.string(),
  eventName: z.string(),
  tagline: z.string(),
  date: z.string(),
  time: z.string(),
  venue: z.string(),
  city: z.string(),
  price: z.string(),
  details: z.array(z.string()),
  ctaText: z.string(),
  hostedBy: z.string(),
});

export type EventPromoStillProps = z.infer<typeof EventPromoStillSchema>;

/**
 * EventPromoStill — static event promotion graphic
 *
 * Layout (top to bottom):
 *   Event name (large)
 *   Tagline
 *   Divider
 *   Date / Time / Venue block
 *   Details list
 *   Price badge
 *   CTA
 *   Hosted by
 *   Logo
 */
export const EventPromoStill = ({
  brand,
  eventName,
  tagline,
  date,
  time,
  venue,
  city,
  price,
  details,
  ctaText,
  hostedBy,
}: EventPromoStillProps) => {
  const config: BrandConfig = BRANDS[brand] ?? BRANDS.freelabel;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${config.accentColor}35 0%, transparent 55%)`,
          filter: "blur(120px)",
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage: `
            linear-gradient(${config.accentColor} 1px, transparent 1px),
            linear-gradient(90deg, ${config.accentColor} 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* Event name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: NEUTRAL.white,
            letterSpacing: -3,
            textAlign: "center",
            lineHeight: 1.0,
            textTransform: "uppercase",
            maxWidth: 900,
          }}
        >
          {eventName}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: config.accentColor,
            letterSpacing: 4,
            textTransform: "uppercase",
            textAlign: "center",
            marginTop: 4,
          }}
        >
          {tagline}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 100,
            height: 4,
            borderRadius: 2,
            backgroundColor: config.accentColor,
            boxShadow: `0 0 16px ${config.accentColor}60`,
            marginTop: 8,
            marginBottom: 8,
          }}
        />

        {/* Date / Time / Venue block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: NEUTRAL.white,
              letterSpacing: -1,
            }}
          >
            {date}
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: NEUTRAL.gray300,
              letterSpacing: 1,
            }}
          >
            {time}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: NEUTRAL.gray400,
              letterSpacing: 1,
              textAlign: "center",
            }}
          >
            {venue} · {city}
          </div>
        </div>

        {/* Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            marginTop: 12,
          }}
        >
          {details.map((detail) => (
            <div
              key={detail}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 30,
                  borderRadius: 2,
                  backgroundColor: config.accentColor,
                  boxShadow: `0 0 10px ${config.accentColor}50`,
                }}
              />
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: NEUTRAL.white,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                {detail}
              </div>
            </div>
          ))}
        </div>

        {/* Price badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 16,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: NEUTRAL.white,
              background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentGlow})`,
              padding: "10px 36px",
              borderRadius: 50,
              letterSpacing: 1,
              boxShadow: `0 0 24px ${config.accentColor}40`,
            }}
          >
            {price}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: NEUTRAL.white,
            letterSpacing: -0.5,
            textAlign: "center",
            marginTop: 8,
          }}
        >
          {ctaText}
        </div>

        {/* Hosted by */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: NEUTRAL.gray500,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          {hostedBy}
        </div>

        {/* Logo */}
        <Img
          src={staticFile("freelabel-logo.png")}
          style={{
            width: 44,
            height: 44,
            objectFit: "contain",
            marginTop: 8,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
