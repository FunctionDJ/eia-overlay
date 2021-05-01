/* global nodecg */
import * as React from "react";
import { render } from "react-dom";
import Marquee from "react-double-marquee";

const lineupReplicant = nodecg.Replicant<string>("lineup");

const App = () => {
  const [text, setText] = React.useState("Waiting for nodecg...");

  React.useEffect(() => {
    lineupReplicant.on("change", lineup => setText(lineup));
  }, []);

  return (
    <Marquee
      direction="left"
      delay={0}
      speed={0.04}
      childMargin={0}
    >
      {text}
    </Marquee>
  );
};

render(
  <App/>,
  document.getElementById("bottom-banner")
);
