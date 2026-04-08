import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z } from "zod";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const HalfPageAdStillSchema = z.object({
  companyName: z.string(),
  companyLine2: z.string().optional(),
  tagline: z.string(),
  description: z.string(),
  services: z.array(z.string()),
  credentials: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).optional(),
  contactEmail: z.string(),
  contactPhone: z.string(),
  contactWeb: z.string().optional(),
  ownerName: z.string(),
  ownerTitle: z.string(),
  badge: z.string().optional(),
  primaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  bgColor: z.string().optional(),
});

export type HalfPageAdStillProps = z.infer<typeof HalfPageAdStillSchema>;

export const HalfPageAdStill = ({
  companyName,
  companyLine2,
  tagline,
  description,
  services,
  credentials,
  contactEmail,
  contactPhone,
  contactWeb,
  ownerName,
  ownerTitle,
  badge,
  primaryColor,
  accentColor,
  bgColor,
}: HalfPageAdStillProps) => {
  const primary = primaryColor ?? "#1e3a5f";
  const accent = accentColor ?? "#8b1a1a";
  const bg = bgColor ?? "#ffffff";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        fontFamily,
        padding: 0,
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 28,
          background: `linear-gradient(to bottom, ${accent}, ${primary})`,
        }}
      />

      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 260,
          height: 260,
          background: `linear-gradient(135deg, transparent 50%, ${primary}08 50%)`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          paddingLeft: 160,
          paddingRight: 160,
          paddingTop: 130,
          paddingBottom: 100,
        }}
      >
        {/* Top section */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 60,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 800,
                  color: primary,
                  letterSpacing: 1,
                  lineHeight: 1.15,
                }}
              >
                {companyName}
              </div>
              {companyLine2 && (
                <div
                  style={{
                    fontSize: 72,
                    fontWeight: 800,
                    color: primary,
                    letterSpacing: 1,
                    lineHeight: 1.15,
                  }}
                >
                  {companyLine2}
                </div>
              )}
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 500,
                  color: accent,
                  letterSpacing: 3,
                  marginTop: 8,
                }}
              >
                LLC &nbsp;|&nbsp; SAN ANTONIO, TEXAS
              </div>
            </div>
            {badge && (
              <div
                style={{
                  background: primary,
                  color: "#ffffff",
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: 2,
                  padding: "14px 30px",
                  borderRadius: 8,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  marginTop: 14,
                }}
              >
                {badge}
              </div>
            )}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 46,
              fontWeight: 600,
              color: accent,
              lineHeight: 1.3,
              marginBottom: 50,
            }}
          >
            {tagline}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 36,
              color: "#374151",
              lineHeight: 1.55,
              marginBottom: 56,
              maxWidth: "92%",
            }}
          >
            {description}
          </div>

          {/* Services Grid */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "18px 80px",
              marginBottom: 60,
            }}
          >
            {services.map((service) => (
              <div
                key={service}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  width: "45%",
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    background: accent,
                    borderRadius: 3,
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontSize: 33,
                    fontWeight: 500,
                    color: primary,
                    lineHeight: 1.4,
                  }}
                >
                  {service}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Credentials bar */}
          {credentials && credentials.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 50,
                alignItems: "center",
                padding: "24px 36px",
                background: "#f8f9fb",
                borderRadius: 16,
                borderLeft: `8px solid ${accent}`,
                marginBottom: 40,
              }}
            >
              {credentials.map((cred) => (
                <div
                  key={cred.label}
                  style={{
                    fontSize: 27,
                    color: "#6b7280",
                    fontWeight: 500,
                  }}
                >
                  <span style={{ color: primary, fontWeight: 700 }}>{cred.label}</span>{" "}
                  {cred.value}
                </div>
              ))}
            </div>
          )}

          {/* Contact strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 30,
              borderTop: `5px solid ${primary}`,
            }}
          >
            <div style={{ display: "flex", gap: 70 }}>
              <div style={{ fontSize: 30, color: "#374151" }}>
                <span style={{ color: primary, fontWeight: 700 }}>Email: </span>
                {contactEmail}
              </div>
              <div style={{ fontSize: 30, color: "#374151" }}>
                <span style={{ color: primary, fontWeight: 700 }}>Phone: </span>
                {contactPhone}
              </div>
              {contactWeb && (
                <div style={{ fontSize: 30, color: "#374151" }}>
                  <span style={{ color: primary, fontWeight: 700 }}>Web: </span>
                  {contactWeb}
                </div>
              )}
            </div>
            <div style={{ textAlign: "right" as const }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: primary }}>
                {ownerName}
              </div>
              <div style={{ fontSize: 26, color: "#6b7280", fontWeight: 500 }}>
                {ownerTitle}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
