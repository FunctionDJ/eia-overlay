import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { SocialEntry } from "../data/SocialEntry";
import { SocialPlatform, socialPlatformValues } from "../data/SocialPlatform";

interface SocialProps {
  social: SocialEntry
  changePlatform: (value: SocialPlatform) => void,
  changeTag: (value: string) => void,
  remove: () => void
}

const Social: React.FC<SocialProps> = ({ social, changePlatform, changeTag, remove }) => {
  return (
    <div className="control is-flex" style={{ columnGap: "0.2rem" }}>
      <div className="select is-small">
        <select
          value={social.platform}
          onChange={e => changePlatform(e.currentTarget.value as unknown as SocialPlatform)}
        >
          {socialPlatformValues.map(platform => (
            <option key={platform} value={platform}>{platform}</option>
          ))}
        </select>
      </div>
      <input
        className="input is-small"
        value={social.tag}
        onChange={e => changeTag(e.currentTarget.value)}
      />
      <button
        className="button is-small is-danger"
        onClick={remove}
      >
        <FontAwesomeIcon icon={faTimes}/>
      </button>
    </div>
  );
};

export default Social;
