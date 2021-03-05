import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SocialPlatform } from "../data/SocialPlatform";
import { SocialEntry } from "../data/SocialEntry";
import Social from "./Social";

interface SocialsProps {
  socials: SocialEntry[]
  setSocials: React.Dispatch<React.SetStateAction<SocialEntry[]>>
}

const Socials: React.FC<SocialsProps> = ({ socials, setSocials }) => {
  function add() {
    setSocials(oldSocials => [...oldSocials, {
      platform: "Blank",
      tag: ""
    }]);
  }

  function changeTag(index: number, value: string) {
    setSocials(oldSocials => {
      const clone = [...oldSocials];
      clone[index].tag = value;
      return clone;
    });
  }

  function changePlatform(index: number, value: SocialPlatform) {
    setSocials(oldSocials => {
      const clone = [...oldSocials];
      clone[index].platform = value;
      return clone;
    });
  }

  function remove(index: number) {
    setSocials(oldSocials => {
      const clone = [...oldSocials];
      clone.splice(index, 1);
      return clone;
    });
  }

  return (
    <div className="is-flex is-flex-direction-column" style={{ rowGap: "0.5rem" }}>
      {socials.map((social, index) => (
        <Social
          key={index}
          social={social}
          changePlatform={value => changePlatform(index, value)}
          changeTag={value => changeTag(index, value)}
          remove={() => remove(index)}
        />
      ))}
      <button className="button is-small is-success is-fullwidth" onClick={add}>
        <FontAwesomeIcon icon={faPlus}/>
      </button>
    </div>
  );
};

export default Socials;
