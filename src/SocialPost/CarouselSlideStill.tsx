import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z } from "zod";
import { BRANDS, NEUTRAL, type BrandConfig } from "../brands";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const SlideSchema = z.object({
  type: z.enum(["cover", "content", "quote", "list", "image", "stat", "cta"]),
  headline: z.string().optional(),
  subtitle: z.string().optional(),
  body: z.string().optional(),
  number: z.string().optional(),
  bullets: z.array(z.string()).optional(),
  quoteAuthor: z.string().optional(),
  ctaText: z.string().optional(),
  ctaSubtext: z.string().optional(),
  sectionLabel: z.string().optional(),
  imageUrl: z.string().optional(),
  caption: z.string().optional(),
  statValue: z.string().optional(),
  statLabel: z.string().optional(),
  stats: z.array(z.object({
    value: z.string(),
    label: z.string(),
  })).optional(),
});

export const CarouselSlideStillSchema = z.object({
  brand: z.string(),
  slides: z.array(SlideSchema),
  slideIndex: z.number(),
});

export type CarouselSlideStillProps = z.infer<typeof CarouselSlideStillSchema>;

export const CarouselSlideStill = ({
  brand,
  slides,
  slideIndex,
}: CarouselSlideStillProps) => {
  const config: BrandConfig = BRANDS[brand] ?? BRANDS.freelabel;
  const muted = config.mutedColor ?? NEUTRAL.gray400;
  const slide = slides[slideIndex] ?? slides[0];
  const centered = ["cover", "cta", "quote", "image", "stat"].includes(slide.type);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.bgColor,
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
      }}
    >
      {/* Radial glow — shift position per slide type for variety */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${config.accentColor}25 0%, transparent 60%)`,
          filter: "blur(100px)",
          top: slide.type === "image" ? -200 : slide.type === "stat" ? "auto" : undefined,
          bottom: slide.type === "stat" ? -200 : undefined,
          left: slide.type === "content" ? -200 : undefined,
          right: slide.type === "list" ? -200 : undefined,
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage: `
            linear-gradient(${config.accentColor} 1px, transparent 1px),
            linear-gradient(90deg, ${config.accentColor} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Progress dots */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 10,
          zIndex: 3,
        }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === slideIndex ? 36 : 10,
              height: 10,
              borderRadius: 5,
              background: i === slideIndex
                ? config.accentColor
                : `${config.textColor}20`,
              boxShadow: i === slideIndex
                ? `0 0 10px ${config.accentColor}50`
                : "none",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: centered ? "center" : "flex-start",
          justifyContent: "center",
          zIndex: 1,
          width: "100%",
          height: "100%",
          padding: slide.type === "image" ? "80px 60px 100px" : "80px 80px 100px",
          gap: 20,
          textAlign: centered ? "center" as const : "left" as const,
        }}
      >
        {/* ── COVER ── */}
        {slide.type === "cover" && (
          <>
            {slide.subtitle && (
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: config.accentColor,
                  letterSpacing: 5,
                  textTransform: "uppercase",
                }}
              >
                {slide.subtitle}
              </div>
            )}
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: config.textColor,
                letterSpacing: -2,
                lineHeight: 1.1,
                maxWidth: 850,
              }}
            >
              {slide.headline}
            </div>
            <div
              style={{
                width: 80,
                height: 4,
                borderRadius: 2,
                backgroundColor: config.accentColor,
                boxShadow: `0 0 12px ${config.accentColor}50`,
                marginTop: 8,
                marginBottom: 8,
              }}
            />
            {slide.body && (
              <div
                style={{
                  fontSize: 28,
                  color: muted,
                  lineHeight: 1.5,
                  maxWidth: 700,
                }}
              >
                {slide.body}
              </div>
            )}
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: muted,
                letterSpacing: 3,
                marginTop: 32,
                textTransform: "uppercase",
              }}
            >
              SWIPE →
            </div>
          </>
        )}

        {/* ── CONTENT (numbered tip) ── */}
        {slide.type === "content" && (
          <>
            {slide.number && (
              <div
                style={{
                  position: "absolute",
                  top: 50,
                  right: 40,
                  fontSize: 200,
                  fontWeight: 900,
                  color: `${config.accentColor}10`,
                  lineHeight: 1,
                }}
              >
                {slide.number}
              </div>
            )}
            {slide.sectionLabel && (
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: config.accentColor,
                  letterSpacing: 5,
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                {slide.sectionLabel}
              </div>
            )}
            {slide.number && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: config.accentColor,
                    boxShadow: `0 0 20px ${config.accentColor}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    fontWeight: 900,
                    color: config.textColor,
                  }}
                >
                  {slide.number}
                </div>
              </div>
            )}
            <div
              style={{
                fontSize: 52,
                fontWeight: 900,
                color: config.textColor,
                letterSpacing: -1,
                lineHeight: 1.15,
                maxWidth: "85%",
              }}
            >
              {slide.headline}
            </div>
            <div
              style={{
                width: 50,
                height: 4,
                borderRadius: 2,
                backgroundColor: config.accentColor,
                boxShadow: `0 0 10px ${config.accentColor}40`,
                marginTop: 4,
                marginBottom: 4,
              }}
            />
            {slide.body && (
              <div
                style={{
                  fontSize: 30,
                  color: muted,
                  lineHeight: 1.55,
                  maxWidth: "90%",
                }}
              >
                {slide.body}
              </div>
            )}
          </>
        )}

        {/* ── IMAGE + CAPTION ── */}
        {slide.type === "image" && (
          <>
            {/* Image container with accent border */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 860,
                borderRadius: 20,
                overflow: "hidden",
                border: `2px solid ${config.accentColor}30`,
                boxShadow: `0 0 40px ${config.accentColor}15`,
                marginBottom: 8,
              }}
            >
              {slide.imageUrl && (
                <Img
                  src={slide.imageUrl}
                  style={{
                    width: "100%",
                    height: 560,
                    objectFit: "cover",
                  }}
                />
              )}
              {/* Gradient overlay at bottom of image */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 120,
                  background: `linear-gradient(transparent, ${config.bgColor}cc)`,
                }}
              />
            </div>
            {/* Caption */}
            {slide.caption && (
              <div
                style={{
                  fontSize: 22,
                  color: muted,
                  fontStyle: "italic",
                  lineHeight: 1.4,
                  maxWidth: 700,
                  marginTop: 4,
                }}
              >
                {slide.caption}
              </div>
            )}
            {/* Headline below image */}
            {slide.headline && (
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: config.textColor,
                  lineHeight: 1.2,
                  maxWidth: 750,
                  marginTop: 8,
                }}
              >
                {slide.headline}
              </div>
            )}
          </>
        )}

        {/* ── STAT / BIG NUMBER ── */}
        {slide.type === "stat" && (
          <>
            {slide.sectionLabel && (
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: config.accentColor,
                  letterSpacing: 5,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {slide.sectionLabel}
              </div>
            )}
            {/* Single big stat */}
            {slide.statValue && !slide.stats && (
              <>
                <div
                  style={{
                    fontSize: 140,
                    fontWeight: 900,
                    color: config.textColor,
                    lineHeight: 1,
                    letterSpacing: -4,
                    textShadow: `0 0 60px ${config.accentColor}30`,
                  }}
                >
                  {slide.statValue}
                </div>
                {slide.statLabel && (
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 600,
                      color: muted,
                      marginTop: 8,
                      letterSpacing: 1,
                    }}
                  >
                    {slide.statLabel}
                  </div>
                )}
              </>
            )}
            {/* Multi stat grid */}
            {slide.stats && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 40,
                  marginTop: 16,
                }}
              >
                {slide.stats.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minWidth: 200,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 72,
                        fontWeight: 900,
                        color: config.textColor,
                        lineHeight: 1,
                        textShadow: `0 0 30px ${config.accentColor}25`,
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: muted,
                        marginTop: 8,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Body text below stats */}
            {slide.body && (
              <div
                style={{
                  fontSize: 26,
                  color: muted,
                  lineHeight: 1.5,
                  maxWidth: 700,
                  marginTop: 24,
                }}
              >
                {slide.body}
              </div>
            )}
          </>
        )}

        {/* ── QUOTE ── */}
        {slide.type === "quote" && (
          <>
            <div
              style={{
                fontSize: 120,
                color: `${config.accentColor}40`,
                lineHeight: 1,
                marginBottom: -40,
              }}
            >
              &ldquo;
            </div>
            <div
              style={{
                fontSize: 40,
                fontWeight: 600,
                color: config.textColor,
                lineHeight: 1.5,
                maxWidth: "85%",
                fontStyle: "italic",
              }}
            >
              {slide.body}
            </div>
            {slide.quoteAuthor && (
              <div
                style={{
                  fontSize: 22,
                  color: config.accentColor,
                  fontWeight: 600,
                  marginTop: 16,
                  letterSpacing: 2,
                }}
              >
                — {slide.quoteAuthor}
              </div>
            )}
          </>
        )}

        {/* ── LIST ── */}
        {slide.type === "list" && (
          <>
            {slide.headline && (
              <div
                style={{
                  fontSize: 46,
                  fontWeight: 900,
                  color: config.textColor,
                  letterSpacing: -1,
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}
              >
                {slide.headline}
              </div>
            )}
            {slide.bullets?.map((bullet, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  paddingBottom: 14,
                  paddingTop: 6,
                  borderBottom: i < (slide.bullets?.length ?? 0) - 1
                    ? `1px solid ${config.textColor}10`
                    : "none",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 36,
                    borderRadius: 4,
                    backgroundColor: config.accentColor,
                    boxShadow: `0 0 8px ${config.accentColor}40`,
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 600,
                    color: config.textColor,
                    letterSpacing: 0.5,
                  }}
                >
                  {bullet}
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── CTA ── */}
        {slide.type === "cta" && (
          <>
            {slide.headline && (
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: config.textColor,
                  letterSpacing: -1,
                  lineHeight: 1.15,
                }}
              >
                {slide.headline}
              </div>
            )}
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
            {slide.body && (
              <div
                style={{
                  fontSize: 26,
                  color: muted,
                  lineHeight: 1.5,
                  maxWidth: "80%",
                }}
              >
                {slide.body}
              </div>
            )}
            {slide.ctaText && (
              <div
                style={{
                  background: config.accentColor,
                  color: config.textColor,
                  fontSize: 30,
                  fontWeight: 800,
                  padding: "22px 56px",
                  borderRadius: 14,
                  marginTop: 20,
                  boxShadow: `0 0 30px ${config.accentColor}40`,
                  letterSpacing: 1,
                }}
              >
                {slide.ctaText}
              </div>
            )}
            {slide.ctaSubtext && (
              <div
                style={{
                  fontSize: 20,
                  color: muted,
                  marginTop: 8,
                  letterSpacing: 1,
                }}
              >
                {slide.ctaSubtext}
              </div>
            )}
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: config.accentColor,
                letterSpacing: 2,
                marginTop: 16,
              }}
            >
              {config.ctaUrl.toUpperCase()}
            </div>
          </>
        )}
      </div>

      {/* Bottom bar — brand + logo */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 80,
          right: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: muted,
            letterSpacing: 2,
          }}
        >
          {config.handle}
        </div>
        <Img
          src={staticFile(config.logoFile ?? "fllogo.png")}
          style={{
            width: 32,
            height: 32,
            objectFit: "contain",
            opacity: 0.6,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
