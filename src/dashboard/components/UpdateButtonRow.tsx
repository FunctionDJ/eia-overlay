import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const UpdateButtonRow: React.FC<{ update: () => void }> = ({ update }) => {
  const [showCheckmark, setShowCheckmark] = useState(false);

  function handleClick() {
    update();
    setShowCheckmark(true);

    setTimeout(() => setShowCheckmark(false), 2000);
  }

  return (
    <tr>
      <td colSpan={2}>
        <button
          className="button is-success is-small is-fullwidth"
          onClick={handleClick}
        >
          <div className="is-flex is-align-items-center" style={{ columnGap: "0.5rem" }}>
            <span className="fa fa-fw"/>
            Update
            <FontAwesomeIcon opacity={showCheckmark ? 1 : 0} icon={faCheck}/>
          </div>
        </button>
      </td>
    </tr>
  );
};

export default UpdateButtonRow;
