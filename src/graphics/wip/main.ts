/* global nodecg */
import Marquee3k from "marquee3000";
import OverlayData from "../../shared/OverlayData";

// @ts-ignore
const page = window.page;

const replicantId = `overlay-data-${page}`;

const { querySelector } = document;
const qs = querySelector.bind(document);

Marquee3k.init();

const title = qs<HTMLDivElement>("#top-banner")!;
const discordLink = qs<HTMLParagraphElement>("#discord-link")!;
const discordLinkSubtitle = qs<HTMLParagraphElement>("#discord-link-subtitle")!;
const bottomBanner = qs<HTMLDivElement>("#bottom-banner")!;

const white = qs<HTMLSpanElement>("#white")!;
const yellow = qs<HTMLSpanElement>("#yellow")!;
const logo = qs<HTMLImageElement>("#dj-logo")!;
const linkContainer = qs<HTMLDivElement>("#link-container")!;

const replicant = nodecg.Replicant<OverlayData>(replicantId);

replicant.on("change", (newValue) => {
  title.innerText = newValue.heading;
  discordLink.innerText = newValue.discordLink;
  discordLinkSubtitle.innerText = newValue.discordLinkSubtitle;

  const nameHalfLength = Math.ceil(newValue.djName.length / 2);
  white.innerText = newValue.djName.slice(0, nameHalfLength);
  yellow.innerText = newValue.djName.slice(nameHalfLength);

  logo.src = newValue.logoURL;
  linkContainer.innerHTML = newValue.socials.map(s => (
    `<p>${s.platform}: ${s.tag}</p>`
  )).join();

  Marquee3k.pause(0);

  bottomBanner.innerHTML = `
    <div class="marquee3k" data-speed="0.25">
      <p>
        ${newValue.lineup}
      </p>
    </div>
  `;

  Marquee3k.init();
});

const chat = document.querySelector<HTMLIFrameElement>("#chat")!;

function updateChatSizeFilter() {
  const factor = window.innerHeight / 1080;
  console.log(factor);

  chat.style.transform = `scale(${factor})`;
}

document.addEventListener("DOMContentLoaded", () => {
  const parentBox = chat.parentElement!.getBoundingClientRect();
  const factor = window.innerHeight / 1080;

  // Calculate the size the parent would have if the window was fullsize
  // We use that for the fixed (!) chat size, because we scale it using a filter
  chat.style.width = (parentBox.width / factor) + "px";
  chat.style.height = (parentBox.height / factor) + "px";

  updateChatSizeFilter();
});

window.addEventListener("resize", updateChatSizeFilter);
