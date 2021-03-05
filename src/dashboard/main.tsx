/* global nodecg */
import React from "react";
import ReactDOM from "react-dom";
import ReplicantLabelRow from "./components/ReplicantLabelRow";
import Socials from "./components/Socials";

const socialsReplicant = nodecg.Replicant("socialsArray", { defaultValue: [""] });

const Dashboard: React.FC = () => {
  const [socials, setSocials] = React.useState<string[]>([""]);

  React.useEffect(() => {
    socialsReplicant.on("change", newValue => {
      console.log("CHANGE", newValue);

      if (JSON.stringify(newValue) === JSON.stringify(socials)) {
        return;
      }

      setSocials(newValue);
    });
  }, []);

  return (
    <>
      <table className="table">
        <tbody>
          <ReplicantLabelRow name="Heading" defaultValue=""/>
          <ReplicantLabelRow name="DJ Name" defaultValue=""/>
          <ReplicantLabelRow name="Logo" defaultValue=""/>
          <ReplicantLabelRow name="Discord Link" defaultValue=""/>
          <ReplicantLabelRow name="Discord Link Subtitle" defaultValue=""/>
          <tr>
            <td>Socials</td>
            <Socials socials={socials} setSocials={setSocials}/>
          </tr>
          <tr>
            <td colSpan={2}>
              <button
                className="button is-success is-small is-fullwidth"
              >
                Update
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
