import { Composition, Folder, Still, staticFile } from "remotion";
import { HiveAd } from "./HiveAd/HiveAd";
import { HiveAdThumbnail } from "./HiveAd/HiveAdThumbnail";
import { FreelabelD2C } from "./FreelabelD2C/FreelabelD2C";
import { FreelabelD2CThumbnail } from "./FreelabelD2C/FreelabelD2CThumbnail";
import { BrandIntro } from "./BrandIntro/BrandIntro";
import { BrandOutro } from "./BrandOutro/BrandOutro";
import { SocialPost } from "./SocialPost/SocialPost";
import { SocialPostStill } from "./SocialPost/SocialPostStill";
import { ClipPost } from "./ClipPost/ClipPost";
import { EventPromoStill } from "./EventPromo/EventPromoStill";
import { EventFlyerStill } from "./EventPromo/EventFlyerStill";

const defaultSocialProps = {
  brand: "freelabel",
  headline: "JOIN OUR TEAM. WE ARE EXPANDING THE NETWORK.",
  roles: ["AI & Tech", "Music Industry", "Creator Economy", "Event Management", "Community Operations", "Media Publishing"],
  eventInfo: "LEARN BY DOING · PAID OPPORTUNITY",
  ctaText: "DM us @freelabelnet on any socials",
  contactHandle: "@freelabelnet",
};

const noZoomSocialProps = {
  ...defaultSocialProps,
  slowZoom: false,
};

const defaultEventFlyerProps = {
  brand: "freelabel",
  preHeadline: "@1believeitornot presents",
  headline: "SONGWARS\nLIVE ATX",
  subtitle: "We not on Discord this time...\nWe live IRL",
  callouts: [
    { text: "8\nArtists", x: 6, y: 50, align: "left" as const },
    { text: "5\nJudges", x: 94, y: 50, align: "right" as const },
    { text: "Pull up &\nperform live", x: 6, y: 65, align: "left" as const },
    { text: "Only one\nartist wins", x: 94, y: 65, align: "right" as const },
  ],
  date: "April 18, 2026 · 7PM",
  venue: "Remedy Elixir House · Austin, TX",
  hostedBy: "twitch.tv/1believeitornot",
  url: "freelabel.net",
};

const defaultEventPromoProps = {
  brand: "freelabel",
  eventName: "SONG WARS",
  tagline: "Live Rap Battle Tournament",
  date: "APRIL 18, 2026",
  time: "7PM — 11PM",
  venue: "Remedy Elixir House",
  city: "Austin, TX",
  price: "TICKETS $10",
  details: [
    "Live Bracket Battles",
    "Judging Panel",
    "Streamed on Twitch & YouTube",
    "Austin Locals vs Out-of-State",
  ],
  ctaText: "Enter to compete @ freelabel.net",
  hostedBy: "Hosted by @1believeitornot × FreeLabel",
};

const defaultClipProps = {
  brand: "freelabel",
  headline: "NOW PLAYING",
  subheadline: "FREELABEL.NET",
  clipSrc: staticFile("sample-clip.mp4"),
  clipDurationInSeconds: 87,
};

export const RemotionRoot = () => {
  return (
    <>
      <Folder name="Ads">
        <Composition
          id="HiveAd"
          component={HiveAd}
          durationInFrames={450}
          fps={30}
          width={1080}
          height={1080}
          defaultProps={{}}
        />
        <Composition
          id="FreelabelD2C"
          component={FreelabelD2C}
          durationInFrames={940}
          fps={30}
          width={1080}
          height={1080}
          defaultProps={{}}
        />
      </Folder>
      <Folder name="Social">
        <Composition
          id="SocialPost"
          component={SocialPost}
          durationInFrames={386}
          fps={30}
          width={1080}
          height={1080}
          defaultProps={defaultSocialProps}
        />
        <Composition
          id="SocialPostStory"
          component={SocialPost}
          durationInFrames={386}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={defaultSocialProps}
        />
        <Composition
          id="SocialPostNoZoom"
          component={SocialPost}
          durationInFrames={386}
          fps={30}
          width={1080}
          height={1080}
          defaultProps={noZoomSocialProps}
        />
        <Composition
          id="SocialPostNoZoomStory"
          component={SocialPost}
          durationInFrames={386}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={noZoomSocialProps}
        />
      </Folder>
      <Folder name="Clips">
        <Composition
          id="ClipPost"
          component={ClipPost}
          durationInFrames={Math.round((3 + 87 + 2) * 30)}
          fps={30}
          width={1080}
          height={1080}
          defaultProps={defaultClipProps}
        />
        <Composition
          id="ClipPostStory"
          component={ClipPost}
          durationInFrames={Math.round((3 + 87 + 2) * 30)}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={defaultClipProps}
        />
      </Folder>
      <Folder name="Brand">
        <Composition
          id="BrandIntro"
          component={BrandIntro}
          durationInFrames={75}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ brand: "discover" }}
        />
        <Composition
          id="BrandOutro"
          component={BrandOutro}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ brand: "discover" }}
        />
      </Folder>
      <Folder name="Stills">
        <Still
          id="HiveAdThumbnail"
          component={HiveAdThumbnail}
          width={1080}
          height={1080}
        />
        <Still
          id="FreelabelD2CThumbnail"
          component={FreelabelD2CThumbnail}
          width={1080}
          height={1080}
        />
        <Still
          id="SocialPostStill"
          component={SocialPostStill}
          width={1080}
          height={1080}
          defaultProps={defaultSocialProps}
        />
        <Still
          id="SocialPostStillStory"
          component={SocialPostStill}
          width={1080}
          height={1920}
          defaultProps={defaultSocialProps}
        />
        <Still
          id="EventFlyerStill"
          component={EventFlyerStill}
          width={2160}
          height={2700}
          defaultProps={defaultEventFlyerProps}
        />
        <Still
          id="EventFlyerStillSquare"
          component={EventFlyerStill}
          width={2160}
          height={2160}
          defaultProps={defaultEventFlyerProps}
        />
        <Still
          id="EventPromoStill"
          component={EventPromoStill}
          width={1080}
          height={1080}
          defaultProps={defaultEventPromoProps}
        />
        <Still
          id="EventPromoStillStory"
          component={EventPromoStill}
          width={1080}
          height={1920}
          defaultProps={defaultEventPromoProps}
        />
      </Folder>
    </>
  );
};
