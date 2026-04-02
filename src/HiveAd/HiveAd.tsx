import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { loadFont } from "@remotion/google-fonts/Inter";
import { COLORS } from "./theme";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneTagline } from "./scenes/SceneTagline";
import { SceneStats } from "./scenes/SceneStats";
import { SceneHardware } from "./scenes/SceneHardware";
import { SceneFeatures } from "./scenes/SceneFeatures";
import { SceneCTA } from "./scenes/SceneCTA";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const HiveAd = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
      }}
    >
      <TransitionSeries>
        {/* Scene 1: IRIS Logo + Hive reveal (0-3s) */}
        <TransitionSeries.Sequence durationInFrames={3 * fps}>
          <SceneIntro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 12 })}
        />

        {/* Scene 2: Tagline (3-6s) */}
        <TransitionSeries.Sequence durationInFrames={3 * fps}>
          <SceneTagline />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 12 })}
        />

        {/* Scene 3: Stats (6-9s) */}
        <TransitionSeries.Sequence durationInFrames={3 * fps}>
          <SceneStats />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 12 })}
        />

        {/* Scene 4: Hardware (9-12s) */}
        <TransitionSeries.Sequence durationInFrames={3 * fps}>
          <SceneHardware />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 12 })}
        />

        {/* Scene 5: Features (12-14s) */}
        <TransitionSeries.Sequence durationInFrames={Math.round(2.5 * fps)}>
          <SceneFeatures />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        {/* Scene 6: CTA (14-15s) */}
        <TransitionSeries.Sequence durationInFrames={Math.round(2.5 * fps)}>
          <SceneCTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
