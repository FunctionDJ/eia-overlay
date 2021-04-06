import React, { Dispatch, SetStateAction } from "react";
import { SocialEntry } from "../data/SocialEntry";
import Socials from "./Socials";

interface SocialsRowProps {
  socials: SocialEntry[]
  setSocials: Dispatch<SetStateAction<SocialEntry[]>>
}

const SocialsRow: React.FC<SocialsRowProps> = ({ socials, setSocials }) => (
  <tr>
    <td>Socials</td>
    <td>
      <Socials socials={socials} setSocials={setSocials}/>
    </td>
  </tr>
);

export default SocialsRow;
