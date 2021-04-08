/* global nodecg */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import HeadingRow from "./components/HeadingRow";
import LoaderOverlay from "./components/LoaderOverlay";
import RowLabelInput from "./components/RowLabelInput";
import UpdateButtonRow from "./components/UpdateButtonRow";

const replicant = nodecg.Replicant("lineup", {
  defaultValue: "[[no lineup yet]]"
});

const Dashboard: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const [lineup, setLineup] = useState("");

  useEffect(() => {
    replicant.on("change", newValue => {
      console.log("CHANGE", newValue);
      setLoader(false);
      setLineup(newValue);
    });
  }, []);

  function update() {
    replicant.value = lineup;
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
          <RowLabelInput name="Lineup" value={lineup} setValue={setLineup}/>
          <UpdateButtonRow update={update}/>
        </tbody>
      </table>
    </>
  );
};

const root = document.getElementById("root")!;

ReactDOM.render(<Dashboard/>, root);
