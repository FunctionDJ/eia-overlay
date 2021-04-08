import { SocialEntry } from "../dashboard/data/SocialEntry";

export interface OverlayDataWIP {
  heading: string
  djName: string
  logoURL: string
  discordLink: string
  discordLinkSubtitle: string
  socials: SocialEntry[]
  lineup: string
}

export interface GraphicDataPage {
  djName: string
  logoURL: string
  socials: SocialEntry[]
}
