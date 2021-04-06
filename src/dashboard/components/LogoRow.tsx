import React, { Dispatch, SetStateAction } from "react";
import LogoPicker from "./LogoPicker";

interface LogoRowProps {
  logoURL: string,
  setLogoURL: Dispatch<SetStateAction<string>>
}

const LogoRow: React.FC<LogoRowProps> = ({ logoURL, setLogoURL }) => (
  <tr>
    <td>Logo</td>
    <td>
      <LogoPicker
        logoURL={logoURL}
        setLogoURL={setLogoURL}
      />
    </td>
  </tr>
);

export default LogoRow;
