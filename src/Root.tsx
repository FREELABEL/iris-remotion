import { Composition, Folder, Still, staticFile } from "remotion";
import { HiveAd } from "./HiveAd/HiveAd";
import { HiveAdThumbnail } from "./HiveAd/HiveAdThumbnail";
import { FreelabelD2C } from "./FreelabelD2C/FreelabelD2C";
import { FreelabelD2CThumbnail } from "./FreelabelD2C/FreelabelD2CThumbnail";
import { BrandIntro } from "./BrandIntro/BrandIntro";
import { BrandOutro } from "./BrandOutro/BrandOutro";
import { SocialPost } from "./SocialPost/SocialPost";
import { SocialPostStill } from "./SocialPost/SocialPostStill";
import { CarouselSlideStill } from "./SocialPost/CarouselSlideStill";
import { ClipPost } from "./ClipPost/ClipPost";
import { EventPromoStill } from "./EventPromo/EventPromoStill";
import { EventFlyerStill } from "./EventPromo/EventFlyerStill";
import { BarMenuStill } from "./EventPromo/BarMenuStill";
import { HalfPageAdStill } from "./EventPromo/HalfPageAdStill";

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

const defaultBarMenuProps = {
  coupleNames: "Jade & Ben",
  date: "May 16, 2026",
  signatureDrinkHis: {
    label: "His",
    drinks: [
      { name: "The Ben", description: "Whiskey, sweet tea, blackberry syrup, lemon" },
      { name: "Midnight Orchard", description: "Whiskey, apple cider, blackberry syrup, cinnamon" },
      { name: "Honey Hibiscus", description: "Whiskey, hibiscus tea, honey, lemon" },
    ],
  },
  signatureDrinkHers: {
    label: "Hers",
    drinks: [
      { name: "Cherry Blossom Sweet Tea", description: "Vodka, sweet tea, cherry syrup, lemon" },
      { name: "Burgundy Rose", description: "Vodka, red wine reduction, rose water, honey" },
      { name: "Hibiscus Velvet", description: "Vodka, hibiscus tea, lime, prosecco float" },
    ],
  },
  sections: [
    {
      title: "Beer",
      items: [
        { name: "Shiner Bock" },
        { name: "Miller Lite" },
        { name: "Michelob Ultra" },
      ],
    },
    {
      title: "Champagne",
      items: [
        { name: "Brut", description: "For the toast" },
        { name: "Prosecco" },
      ],
    },
  ],
  accentColor: "#722F37",
  accentSecondary: "#B76E79",
  bgColor: "#F5F0E8",
  note: "Please drink responsibly — Cheers to the happy couple!",
};

const defaultHalfPageAdProps = {
  companyName: "AYALA ENGINEERING",
  companyLine2: "& CONSULTING",
  tagline: "Strengthening Leadership. Streamlining Operations.",
  description: "AEC helps government and private organizations grow through leadership development, process improvement, and strategic consulting. We partner with agencies and businesses to build stronger teams, improve efficiency, and deliver measurable results.",
  services: [
    "Engineering & Technical Services",
    "Program & Project Management",
    "Business Process Improvement",
    "Communication & Leadership",
    "Supply & Value Chain Management",
    "Mediation & Conflict Resolution",
    "Artificial Intelligence",
    "Professional Training & Development",
  ],
  credentials: [
    { label: "SAM.gov", value: "Registered" },
    { label: "UEI:", value: "TG28REG2Q1P3" },
    { label: "CAGE:", value: "9QV64" },
    { label: "DIR", value: "Contract Holder" },
    { label: "TXMAS", value: "Approved" },
  ],
  contactEmail: "jayala@aec-hq.com",
  contactPhone: "(210) 885-6552",
  contactWeb: "aec-hq.com",
  ownerName: "Dr. John F. Ayala, PE, PMP, LSSMBB",
  ownerTitle: "President & CEO",
  badge: "Minority-Owned Small Business",
  primaryColor: "#1e3a5f",
  accentColor: "#8b1a1a",
  bgColor: "#ffffff",
};

const defaultCarouselProps = {
  brand: "freelabel",
  slideIndex: 0,
  slides: [
    {
      type: "cover" as const,
      subtitle: "Marketing Tips",
      headline: "5 Ways to Grow Your Brand on Social Media",
      body: "Simple strategies that actually work in 2026.",
    },
    {
      type: "content" as const,
      number: "1",
      headline: "Post Consistently",
      body: "Pick 3-5 days a week and stick to it. Algorithms reward consistency over volume. Quality on a schedule beats random bursts.",
    },
    {
      type: "content" as const,
      number: "2",
      headline: "Lead with Value",
      body: "Every post should teach, entertain, or inspire. If your audience learns something, they'll come back for more.",
    },
    {
      type: "image" as const,
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1080&h=560&fit=crop",
      caption: "Brands that post short-form video see 2-3x more organic reach than static images alone.",
      headline: "Short-Form Video Is the #1 Growth Channel",
    },
    {
      type: "stat" as const,
      sectionLabel: "The Numbers",
      stats: [
        { value: "2.3x", label: "More Reach" },
        { value: "47%", label: "Higher Engagement" },
        { value: "5x", label: "Share Rate" },
      ],
      body: "Brands using Reels, TikTok, and Shorts consistently outperform static-only accounts.",
    },
    {
      type: "content" as const,
      number: "3",
      headline: "Use Short-Form Video",
      body: "Reels and TikToks get 2-3x more reach than static posts. You don't need a studio — your phone is enough.",
    },
    {
      type: "quote" as const,
      body: "The best marketing doesn't feel like marketing. It feels like someone actually giving a damn.",
      quoteAuthor: "Tom Fishburne",
    },
    {
      type: "list" as const,
      headline: "Quick Wins",
      bullets: [
        "Engage in comments for 15 min after posting",
        "Repurpose long content into bite-sized posts",
        "Use 3-5 relevant hashtags, not 30",
        "Share behind-the-scenes content",
        "Collaborate with creators in your niche",
      ],
    },
    {
      type: "cta" as const,
      headline: "Ready to Grow?",
      body: "Follow us for weekly tips on branding, content, and AI-powered marketing.",
      ctaText: "Follow @freelabelnet",
      ctaSubtext: "Link in bio for more resources",
    },
  ],
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
      <Folder name="Print">
        <Still
          id="BarMenuStill"
          component={BarMenuStill}
          width={3600}
          height={2400}
          defaultProps={defaultBarMenuProps}
        />
        <Still
          id="BarMenuStillSquare"
          component={BarMenuStill}
          width={2160}
          height={2160}
          defaultProps={defaultBarMenuProps}
        />
        {/* Carousel slides — register 0 through 8 */}
        {[0,1,2,3,4,5,6,7,8].map((i) => (
          <Still
            key={`carousel-${i}`}
            id={`CarouselSlide${i}`}
            component={CarouselSlideStill}
            width={1080}
            height={1080}
            defaultProps={{ ...defaultCarouselProps, slideIndex: i }}
          />
        ))}
        <Still
          id="HalfPageAdStill"
          component={HalfPageAdStill}
          width={2475}
          height={1650}
          defaultProps={defaultHalfPageAdProps}
        />
      </Folder>
    </>
  );
};
