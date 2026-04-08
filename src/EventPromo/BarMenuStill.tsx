import { AbsoluteFill } from "remotion";
import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadJosefin } from "@remotion/google-fonts/JosefinSans";
import { z } from "zod";

const { fontFamily: cormorantFamily } = loadCormorant("normal", {
  weights: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const { fontFamily: josefinFamily } = loadJosefin("normal", {
  weights: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const DrinkItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

const SectionSchema = z.object({
  title: z.string(),
  icon: z.string().optional(),
  items: z.array(DrinkItemSchema),
});

export const BarMenuStillSchema = z.object({
  coupleNames: z.string(),
  date: z.string(),
  signatureDrinkHis: z.object({
    label: z.string(),
    drinks: z.array(z.object({
      name: z.string(),
      description: z.string(),
    })),
  }),
  signatureDrinkHers: z.object({
    label: z.string(),
    drinks: z.array(z.object({
      name: z.string(),
      description: z.string(),
    })),
  }),
  sections: z.array(SectionSchema),
  accentColor: z.string().optional(),
  accentSecondary: z.string().optional(),
  bgColor: z.string().optional(),
  note: z.string().optional(),
});

export type BarMenuStillProps = z.infer<typeof BarMenuStillSchema>;

export const BarMenuStill = ({
  coupleNames,
  date,
  signatureDrinkHis,
  signatureDrinkHers,
  sections,
  accentColor,
  accentSecondary,
  bgColor,
  note,
}: BarMenuStillProps) => {
  const accent = accentColor ?? "#722F37";
  const accentSoft = accentSecondary ?? "#B76E79";
  const bg = bgColor ?? "#F5F0E8";

  const textPrimary = "#1a1410";
  const textSecondary = "#5a4a42";
  const textMuted = "#8a7a72";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        fontFamily: josefinFamily,
        padding: "100px 120px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Subtle texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, ${accent} 0.5px, transparent 0.5px),
            radial-gradient(circle at 75% 75%, ${accentSoft} 0.5px, transparent 0.5px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Inner border frame */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          right: 40,
          bottom: 40,
          border: `1px solid ${accent}18`,
          pointerEvents: "none",
        }}
      />

      {/* Corner accents */}
      {[
        { top: 30, left: 30 },
        { top: 30, right: 30 },
        { bottom: 30, left: 30 },
        { bottom: 30, right: 30 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 50,
            height: 50,
            borderTop: i < 2 ? `2px solid ${accent}40` : "none",
            borderBottom: i >= 2 ? `2px solid ${accent}40` : "none",
            borderLeft: i % 2 === 0 ? `2px solid ${accent}40` : "none",
            borderRight: i % 2 === 1 ? `2px solid ${accent}40` : "none",
          }}
        />
      ))}

      {/* LANDSCAPE: LEFT + DIVIDER + RIGHT */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          gap: 0,
          zIndex: 1,
          alignItems: "center",
        }}
      >
        {/* LEFT COLUMN — Header + Signature Cocktails */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1.2,
            paddingRight: 80,
          }}
        >
          {/* "The Bar" */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 300,
              fontFamily: josefinFamily,
              color: accentSoft,
              letterSpacing: 18,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            The Bar
          </div>

          {/* Couple names */}
          <div
            style={{
              fontSize: 160,
              fontWeight: 300,
              fontFamily: cormorantFamily,
              color: accent,
              letterSpacing: 4,
              textAlign: "center",
              lineHeight: 0.95,
            }}
          >
            {coupleNames}
          </div>

          {/* Date */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 300,
              fontFamily: josefinFamily,
              color: textMuted,
              letterSpacing: 12,
              textTransform: "uppercase",
              marginTop: 16,
            }}
          >
            {date}
          </div>

          {/* Ornamental divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 50,
              marginBottom: 50,
              width: "75%",
            }}
          >
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${accent}35)` }} />
            <div style={{ fontSize: 22, color: accentSoft }}>{"✦"}</div>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(270deg, transparent, ${accent}35)` }} />
          </div>

          {/* "Signature Cocktails" */}
          <div
            style={{
              fontSize: 30,
              fontWeight: 400,
              fontFamily: josefinFamily,
              color: accentSoft,
              letterSpacing: 12,
              textTransform: "uppercase",
              marginBottom: 44,
            }}
          >
            Signature Cocktails
          </div>

          {/* His & Hers */}
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: 60,
              justifyContent: "center",
            }}
          >
            {/* His */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 300,
                  fontFamily: josefinFamily,
                  color: textMuted,
                  letterSpacing: 10,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {signatureDrinkHis.label}
              </div>

              <div
                style={{
                  fontSize: 20,
                  fontWeight: 300,
                  fontFamily: josefinFamily,
                  color: accentSoft,
                  letterSpacing: 8,
                  textTransform: "uppercase",
                  marginBottom: 24,
                }}
              >
                Whiskey
              </div>

              {signatureDrinkHis.drinks.map((drink) => (
                <div
                  key={drink.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 500,
                      fontFamily: cormorantFamily,
                      color: textPrimary,
                      textAlign: "center",
                      lineHeight: 1.1,
                    }}
                  >
                    {drink.name}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 300,
                      fontFamily: josefinFamily,
                      color: textMuted,
                      textAlign: "center",
                      marginTop: 4,
                      letterSpacing: 1,
                      maxWidth: 500,
                    }}
                  >
                    {drink.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Vertical divider */}
            <div
              style={{
                width: 1,
                background: `linear-gradient(180deg, transparent, ${accent}25, transparent)`,
                alignSelf: "stretch",
              }}
            />

            {/* Hers */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 300,
                  fontFamily: josefinFamily,
                  color: textMuted,
                  letterSpacing: 10,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {signatureDrinkHers.label}
              </div>

              <div
                style={{
                  fontSize: 20,
                  fontWeight: 300,
                  fontFamily: josefinFamily,
                  color: accentSoft,
                  letterSpacing: 8,
                  textTransform: "uppercase",
                  marginBottom: 24,
                }}
              >
                Vodka
              </div>

              {signatureDrinkHers.drinks.map((drink) => (
                <div
                  key={drink.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 500,
                      fontFamily: cormorantFamily,
                      color: textPrimary,
                      textAlign: "center",
                      lineHeight: 1.1,
                    }}
                  >
                    {drink.name}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 300,
                      fontFamily: josefinFamily,
                      color: textMuted,
                      textAlign: "center",
                      marginTop: 4,
                      letterSpacing: 1,
                      maxWidth: 500,
                    }}
                  >
                    {drink.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          {note && (
            <div
              style={{
                fontSize: 22,
                fontWeight: 300,
                fontFamily: josefinFamily,
                color: textMuted,
                textAlign: "center",
                fontStyle: "italic",
                marginTop: 44,
                letterSpacing: 1,
              }}
            >
              {note}
            </div>
          )}
        </div>

        {/* CENTER DIVIDER */}
        <div
          style={{
            width: 1,
            height: "80%",
            background: `linear-gradient(180deg, transparent 0%, ${accent}30 20%, ${accent}30 80%, transparent 100%)`,
          }}
        />

        {/* RIGHT COLUMN — Beer & Champagne */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 0.8,
            paddingLeft: 80,
            gap: 60,
          }}
        >
          {sections.map((section, idx) => (
            <div
              key={section.title}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* Section title */}
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 400,
                  fontFamily: josefinFamily,
                  color: accent,
                  letterSpacing: 12,
                  textTransform: "uppercase",
                  marginBottom: 28,
                }}
              >
                {section.title}
              </div>

              {/* Items stacked */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 40,
                        fontWeight: 500,
                        fontFamily: cormorantFamily,
                        color: textPrimary,
                        textAlign: "center",
                      }}
                    >
                      {item.name}
                    </div>
                    {item.description && (
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 300,
                          fontFamily: josefinFamily,
                          color: textMuted,
                          textAlign: "center",
                          fontStyle: "italic",
                          letterSpacing: 1,
                        }}
                      >
                        {item.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Divider between sections */}
              {idx < sections.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginTop: 30,
                    width: "50%",
                  }}
                >
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${accent}25)` }} />
                  <div style={{ fontSize: 14, color: `${accentSoft}80` }}>{"✦"}</div>
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(270deg, transparent, ${accent}25)` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
