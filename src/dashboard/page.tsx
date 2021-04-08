/* global nodecg */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { GraphicDataPage } from "../shared/OverlayData";
import clone from "./clone";
import LoaderOverlay from "./components/LoaderOverlay";
import LogoRow from "./components/LogoRow";
import RowLabelInput from "./components/RowLabelInput";
import SocialsRow from "./components/SocialsRow";
import UpdateButtonRow from "./components/UpdateButtonRow";
import { SocialEntry } from "./data/SocialEntry";

// @ts-ignore
const page = window.page;

const replicant = nodecg.Replicant<GraphicDataPage>(`for-graphic-${page}`, {
  defaultValue: {
    djName: "FUNCTION",
    logoURL: "/assets/eia-overlay/djlogos/Function-Logo-2_transparent.png",
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
  const [logoURL, setLogoURL] = useState<string>("");
  const [djName, setDJName] = useState("");

  const getSerializedState = () => JSON.stringify({
    djName,
    logoURL,
    socials
  });

  useEffect(() => {
    replicant.on("change", newValue => {
      console.log("CHANGE", newValue);

      if (JSON.stringify(newValue) === getSerializedState()) {
        return;
      }

      setLoader(false);

      setDJName(newValue.djName);
      setLogoURL(newValue.logoURL);
      setSocials(clone(newValue.socials));
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
