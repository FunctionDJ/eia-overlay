/* global nodecg */
import Marquee3k from "marquee3000";
import { SocialEntry } from "../../dashboard/data/SocialEntry";
import { GraphicDataPage } from "../../shared/OverlayData";

Marquee3k.init();

const mapFontAwesomeIcon = (iconName: string): string => {
  switch (iconName.toLowerCase()) {
    case "snapchat": return "snapchat-ghost";
    default: return iconName.toLowerCase();
  }
};

const bottomBanner = document.querySelector<HTMLDivElement>("#bottom-banner")!;

const djName = document.querySelector<HTMLSpanElement>("#dj-name")!;
const logo = document.querySelector<HTMLImageElement>("#dj-logo")!;
const socialsContainer = document.querySelector<HTMLDivElement>("#socials-container")!;

// @ts-ignore
const page = window.page;

const replicant = nodecg.Replicant<GraphicDataPage>(`for-graphic-${page}`);

const lineupReplicant = nodecg.Replicant<string>("lineup");

lineupReplicant.on("change", lineup => {
  Marquee3k.pause(0);

  bottomBanner.innerHTML = `
    <div class="marquee3k" data-speed="0.5">
      <p>
        ${lineup}
      </p>
    </div>
  `;

  Marquee3k.init();
});

function mapSocialToElement(socialEntry: SocialEntry): HTMLElement {
  const social = document.createElement("div");

  if (socialEntry.platform !== "Blank") {
    const icon = document.createElement("span");
    const faIconName = mapFontAwesomeIcon(socialEntry.platform);
    icon.className = `icon fa fa-${faIconName}`;
    social.append(icon);
  }

  // const img = document.createElement("img");
  // img.src = socialEntry.platform;
  // social.append(img);

  const span = document.createElement("span");
  span.className = "tag";
  span.innerText = socialEntry.tag;
  social.append(span);

  return social;
}

function fillWithChildren(element: HTMLElement, children: HTMLElement[]) {
  children.forEach(c => element.appendChild(c));
}

const emptyImageData = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

replicant.on("change", (newValue) => {
  console.log("nv", newValue);

  djName.innerText = newValue.djName;

  logo.src = newValue.logoURL || emptyImageData;

  socialsContainer.innerHTML = "";
  const socials = newValue.socials.map(mapSocialToElement);
  fillWithChildren(socialsContainer, socials);
});
