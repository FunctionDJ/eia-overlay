/* global nodecg */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import OverlayData from "../shared/OverlayData";
import clone from "./clone";
import HeadingRow from "./components/HeadingRow";
import LoaderOverlay from "./components/LoaderOverlay";
import LogoRow from "./components/LogoRow";
import RowLabelInput from "./components/RowLabelInput";
import SocialsRow from "./components/SocialsRow";
import UpdateButtonRow from "./components/UpdateButtonRow";
import { SocialEntry } from "./data/SocialEntry";

const replicant = nodecg.Replicant<OverlayData>("overlay-data", {
  defaultValue: {
    heading: "INTERNATIONAL AFTERPARTY",
    djName: "FUNCTION",
    logoURL: "/assets/eia-overlay/djlogos/Function-Logo-2_transparent.png",
    discordLink: "DISCORD.GG/IA",
    discordLinkSubtitle: "JOIN THE AFTERPARTY",
    socials: [
      {
        platform: "Twitch",
        tag: "@FunctionDJ"
      }
    ],
    lineup: "[[no lineup yet]]"
  }
});

const Dashboard: React.FC = () => {
  const [loader, setLoader] = useState(true);

  const [socials, setSocials] = useState<SocialEntry[]>([]);
  const [logoURL, setLogoURL] = useState<string>("");
  const [heading, setHeading] = useState("");
  const [djName, setDJName] = useState("");
  const [discordLink, setDiscordLink] = useState("");
  const [discordLinkSubtitle, setDiscordLinkSubtitle] = useState("");
  const [lineup, setLineup] = useState("");

  const getSerializedState = () => JSON.stringify({
    heading,
    djName,
    logoURL,
    discordLink,
    discordLinkSubtitle,
    socials,
    lineup
  });

  useEffect(() => {
    replicant.on("change", newValue => {
      console.log("CHANGE", newValue);

      if (JSON.stringify(newValue) === getSerializedState()) {
        return;
      }

      setLoader(false);

      setHeading(newValue.heading);
      setDJName(newValue.djName);
      setLogoURL(newValue.logoURL);
      setDiscordLink(newValue.discordLink);
      setDiscordLinkSubtitle(newValue.discordLinkSubtitle);
      setSocials(clone(newValue.socials));
      setLineup(newValue.lineup);
    });
  }, []);

  function update() {
    // we deep-clone our state so that nodecg doesn't see any changes we make on the state until we hit update again
    const stateDeepClone = JSON.parse(getSerializedState());
    replicant.value = stateDeepClone;
  }

  return (
    <>
      {loader && <LoaderOverlay/>}
      <table className="table is-fullwidth">
        <colgroup>
          <col span={1}/>
          <col span={1} style={{ minWidth: 300 }}/>
        </colgroup>
        <tbody>
          <HeadingRow>General</HeadingRow>
          <RowLabelInput name="Heading" value={heading} setValue={setHeading}/>
          <RowLabelInput name="Discord Link" value={discordLink} setValue={setDiscordLink}/>
          <RowLabelInput name="Discord Link Subtitle" value={discordLinkSubtitle} setValue={setDiscordLinkSubtitle}/>
          <RowLabelInput name="Lineup" value={lineup} setValue={setLineup}/>
          <HeadingRow>DJ-specific</HeadingRow>
          <RowLabelInput name="DJ Name" value={djName} setValue={setDJName}/>
          <LogoRow logoURL={logoURL} setLogoURL={setLogoURL}/>
          <SocialsRow socials={socials} setSocials={setSocials}/>
          <UpdateButtonRow update={update}/>
        </tbody>
      </table>
    </>
  );
};

const root = document.getElementById("root")!;

ReactDOM.render(<Dashboard/>, root);
