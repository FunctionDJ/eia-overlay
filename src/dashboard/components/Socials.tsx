import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

interface SocialsProps {
  socials: string[]
  setSocials: React.Dispatch<React.SetStateAction<string[]>>
}

const Socials: React.FC<SocialsProps> = ({ socials, setSocials }) => {
  function addSocial() {
    setSocials(oldSocials => {
      oldSocials.push("");
      return [...oldSocials];
    });
  }

  function changeSocial(index: number, value: string) {
    setSocials(oldSocials => {
      oldSocials[index] = value;
      return [...oldSocials];
    });
  }

  function removeSocial(index: number) {
    setSocials(oldSocials => {
      oldSocials.splice(index, 1);
      return [...oldSocials];
    });
  }

  return (
    <td className="is-flex is-flex-direction-column" style={{ rowGap: "0.5rem" }}>
      {socials.map((social, index) => (
        <div key={index} className="control is-flex" style={{ columnGap: "0.2rem" }}>
          <input
            className="input is-small"
            key={index}
            value={social}
            onChange={e => changeSocial(index, e.currentTarget.value)}
          />
          <button
            className="button is-small is-danger"
            onClick={() => removeSocial(index)}
          >
            <FontAwesomeIcon icon={faTimes}/>
          </button>
        </div>
      ))}
      <button className="button is-small is-success is-fullwidth" onClick={addSocial}>
        <FontAwesomeIcon icon={faPlus}/>
      </button>
    </td>
  );
};

export default Socials;
