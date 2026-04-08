import { z } from "zod";

/**
 * Shared brand configuration for all Remotion compositions.
 * Maps to videobrand.php in fl-api — keep in sync.
 */

export const BrandSchema = z.object({
  brand: z.string(),
  brandName: z.string(),
  handle: z.string(),
  tagline: z.string(),
  ctaText: z.string(),
  ctaUrl: z.string(),
  accentColor: z.string(),
  accentGlow: z.string(),
  bgColor: z.string(),
  textColor: z.string(),
  mutedColor: z.string().optional(),
  logoFile: z.string().optional(),
});

export type BrandConfig = z.infer<typeof BrandSchema>;

export const BRANDS: Record<string, BrandConfig> = {
  discover: {
    brand: "discover",
    brandName: "The Discover Page",
    handle: "@thediscoverpage_",
    tagline: "Curating the underground",
    ctaText: "Follow Now",
    ctaUrl: "freelabel.net/discover",
    accentColor: "#ef0000",
    accentGlow: "#ff3333",
    bgColor: "#08080d",
    textColor: "#ffffff",
  },
  beatbox: {
    brand: "beatbox",
    brandName: "Beatbox",
    handle: "@thebeatbox__",
    tagline: "Producer spotlight series",
    ctaText: "Browse Beats",
    ctaUrl: "freelabel.net/beatbox",
    accentColor: "#f97316",
    accentGlow: "#fb923c",
    bgColor: "#0a0a0f",
    textColor: "#ffffff",
  },
  freelabel: {
    brand: "freelabel",
    brandName: "FreeLabel",
    handle: "@freelabelnet",
    tagline: "Own your sound",
    ctaText: "Get Started",
    ctaUrl: "freelabel.net",
    accentColor: "#ef0000",
    accentGlow: "#ff3333",
    bgColor: "#08080d",
    textColor: "#ffffff",
    logoFile: "freelabel-logo.png",
  },
  heyiris: {
    brand: "heyiris",
    brandName: "HeyIRIS",
    handle: "@heyiris.io",
    tagline: "Your AI, your rules",
    ctaText: "Try IRIS",
    ctaUrl: "heyiris.io",
    accentColor: "#8b5cf6",
    accentGlow: "#a78bfa",
    bgColor: "#0a0a0f",
    textColor: "#ffffff",
    logoFile: "iris-logo.png",
  },
  emc_radio: {
    brand: "emc_radio",
    brandName: "EMC Radio",
    handle: "@emcradio",
    tagline: "Electronic music curation",
    ctaText: "Tune In",
    ctaUrl: "freelabel.net/emc",
    accentColor: "#06b6d4",
    accentGlow: "#22d3ee",
    bgColor: "#08080d",
    textColor: "#ffffff",
  },
  moody_beauty: {
    brand: "moody_beauty",
    brandName: "Moody Beauty",
    handle: "@moodybeauty",
    tagline: "Lashes · Brows · Glow",
    ctaText: "Book Now",
    ctaUrl: "moodybeauty.com",
    accentColor: "#A47148",
    accentGlow: "#C28860",
    bgColor: "#FBF8F4",
    textColor: "#3D2A1F",
    mutedColor: "#8B6F5A",
    logoFile: "moody-beauty-logo.png",
  },
  capital_collective: {
    brand: "capital_collective",
    brandName: "Capital Collective",
    handle: "@capital.collective",
    tagline: "Build generational wealth",
    ctaText: "Learn More",
    ctaUrl: "freelabel.net/capital",
    accentColor: "#f59e0b",
    accentGlow: "#fbbf24",
    bgColor: "#0a0a0f",
    textColor: "#ffffff",
  },
};

/** Neutral colors shared across all brand compositions */
export const NEUTRAL = {
  white: "#ffffff",
  gray100: "#f1f5f9",
  gray300: "#cbd5e1",
  gray400: "#94a3b8",
  gray500: "#64748b",
  gray600: "#475569",
  gray800: "#1e293b",
};
