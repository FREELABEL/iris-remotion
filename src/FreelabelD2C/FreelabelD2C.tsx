import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/google-fonts/Inter";

import { COLORS } from "./theme";
import { SceneHook } from "./scenes/SceneHook";
import { SceneThreat } from "./scenes/SceneThreat";
import { SceneStakes } from "./scenes/SceneStakes";
import { SceneReveal } from "./scenes/SceneReveal";
import { SceneSovereignty } from "./scenes/SceneSovereignty";
import { SceneFeatures } from "./scenes/SceneFeatures";
import { SceneCTA } from "./scenes/SceneCTA";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
});

const TRANSITION_DURATION = 15;

export const FreelabelD2C: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
      }}
    >
      <TransitionSeries>
        {/* Scene 1: Hook — "Stop Renting Your Fanbase" */}
        <TransitionSeries.Sequence durationInFrames={140}>
          <SceneHook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2: Threat — Acquisition timeline */}
        <TransitionSeries.Sequence durationInFrames={165}>
          <SceneThreat />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 3: Stakes — What you lose */}
        <TransitionSeries.Sequence durationInFrames={140}>
          <SceneStakes />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 4: Reveal — FREELABEL brand */}
        <TransitionSeries.Sequence durationInFrames={140}>
          <SceneReveal />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 5: Sovereignty — 5 pillars */}
        <TransitionSeries.Sequence durationInFrames={195}>
          <SceneSovereignty />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 6: Features — 6-feature grid */}
        <TransitionSeries.Sequence durationInFrames={140}>
          <SceneFeatures />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 7: CTA — Claim Your Cloud */}
        <TransitionSeries.Sequence durationInFrames={110}>
          <SceneCTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
