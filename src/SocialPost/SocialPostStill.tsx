import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z } from "zod";
import { BRANDS, NEUTRAL, type BrandConfig } from "../brands";
import { SIZES } from "./theme";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const SocialPostStillSchema = z.object({
  brand: z.string(),
  headline: z.string(),
  roles: z.array(z.string()),
  eventInfo: z.string(),
  ctaText: z.string(),
  contactHandle: z.string(),
});

export type SocialPostStillProps = z.infer<typeof SocialPostStillSchema>;

/**
 * SocialPostStill — static graphic for Instagram feed / X posts
 *
 * Layout (top to bottom):
 *   Logo + Brand name
 *   Headline
 *   Divider
 *   Roles list
 *   Event info
 *   CTA button
 *   Handle
 */
export const SocialPostStill = ({
  brand,
  headline,
  roles,
  eventInfo,
  ctaText,
  contactHandle,
}: SocialPostStillProps) => {
  const config: BrandConfig = BRANDS[brand] ?? BRANDS.freelabel;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
        padding: SIZES.padding,
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${config.accentColor}30 0%, transparent 60%)`,
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
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: NEUTRAL.white,
            letterSpacing: -2,
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 800,
            marginTop: 8,
          }}
        >
          {headline}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 4,
            borderRadius: 2,
            backgroundColor: config.accentColor,
            boxShadow: `0 0 12px ${config.accentColor}50`,
            marginTop: 4,
            marginBottom: 4,
          }}
        />

        {/* Section label */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: config.accentColor,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          JOIN OUR NETWORK
        </div>

        {/* Roles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginTop: 4,
          }}
        >
          {roles.map((role) => (
            <div
              key={role}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 36,
                  borderRadius: 2,
                  backgroundColor: config.accentColor,
                  boxShadow: `0 0 10px ${config.accentColor}50`,
                }}
              />
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 800,
                  color: NEUTRAL.white,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {role}
              </div>
            </div>
          ))}
        </div>

        {/* Event info */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: NEUTRAL.gray400,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginTop: 12,
          }}
        >
          {eventInfo}
        </div>

        {/* CTA text */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: NEUTRAL.white,
            letterSpacing: -1,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: 700,
            marginTop: 12,
          }}
        >
          {ctaText}
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: config.accentColor,
            letterSpacing: 2,
            marginTop: 8,
          }}
        >
          {config.ctaUrl.toUpperCase()}
        </div>

        {/* Logo */}
        <Img
          src={staticFile("fllogo.png")}
          style={{
            width: 48,
            height: 48,
            objectFit: "contain",
            marginTop: 16,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
