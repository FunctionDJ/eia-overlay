export const socialPlatformValues = [
  "Blank",
  "Twitter",
  "Twitch",
  "Snapchat",
  "Instagram",
  "Facebook",
  "Mixcloud",
  "SoundCloud"
] as const;

export type SocialPlatform = typeof socialPlatformValues[number];
