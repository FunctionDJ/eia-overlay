/* global nodecg */
import Marquee3k from "marquee3000";

Marquee3k.init();

const title = document.querySelector<HTMLDivElement>("#top-banner")!;

const titleReplicant = nodecg.Replicant("title");

titleReplicant.on("change", (newValue) => {
  if (typeof newValue !== "string") {
    return;
  }

  title.innerText = newValue;
});
