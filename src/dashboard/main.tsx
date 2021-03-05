/* global nodecg */
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import OverlayData from "../shared/OverlayData";
import LoaderOverlay from "./components/LoaderOverlay";
import LogoPicker from "./components/LogoPicker";
import RowLabelInput from "./components/RowLabelInput";
import Socials from "./components/Socials";
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
    ]
  }
});

const Dashboard: React.FC = () => {
  const [loader, setLoader] = useState(true);

  const [socials, setSocials] = useState<SocialEntry[]>([]);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [logoURL, setLogoURL] = useState<string>("");
  const [heading, setHeading] = useState("");
  const [djName, setDJName] = useState("");
  const [discordLink, setDiscordLink] = useState("");
  const [discordLinkSubtitle, setDiscordLinkSubtitle] = useState("");

  const getSerializedState = () => JSON.stringify({
    heading,
    djName,
    logoURL,
    discordLink,
    discordLinkSubtitle,
    socials
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
      setSocials(newValue.socials);
    });
  }, []);

  function update() {
    // we deep-clone our state so that nodecg doesn't see any changes we make on the state until we hit update again
    const stateDeepClone = JSON.parse(getSerializedState());
    replicant.value = stateDeepClone;

    setShowCheckmark(true);

    setTimeout(() => {
      setShowCheckmark(false);
    }, 2000);
  }

  return (
    <>
      {loader && <LoaderOverlay/>}
      <table className="table is-fullwidth">
        <colgroup>
          <col span={1}/>
          <col span={1} style={{ minWidth: 350 }}/>
        </colgroup>
        <tbody>
          <RowLabelInput name="Heading" value={heading} setValue={setHeading}/>
          <RowLabelInput name="DJ Name" value={djName} setValue={setDJName}/>
          <tr>
            <td>Logo</td>
            <td>
              <LogoPicker
                logoURL={logoURL}
                setLogoURL={setLogoURL}
              />
            </td>
          </tr>
          <RowLabelInput name="Discord Link" value={discordLink} setValue={setDiscordLink}/>
          <RowLabelInput name="Discord Link Subtitle" value={discordLinkSubtitle} setValue={setDiscordLinkSubtitle}/>
          <tr>
            <td>Socials</td>
            <td>
              <Socials socials={socials} setSocials={setSocials}/>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button
                className="button is-success is-small is-fullwidth"
                onClick={update}
              >
                <div className="is-flex is-align-items-center" style={{ columnGap: "0.5rem" }}>
                  <span className="fa fa-fw"/>
                  Update
                  <FontAwesomeIcon opacity={showCheckmark ? 1 : 0} icon={faCheck}/>
                </div>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const root = document.getElementById("root")!;

ReactDOM.render(<Dashboard/>, root);
