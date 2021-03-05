import React from "react";
import useReplicant from "../../shared/use-replicant";

interface ReplicantLabelRowProps {
  name: string
  defaultValue: string
}

const ReplicantLabelRow: React.FC<ReplicantLabelRowProps> = ({ name, defaultValue }) => {
  // const [data, setData] = useReplicant(defaultValue, name);

  return (
    <tr>
      <td>{name}</td>
      <td>
        <div className="control">
          <input
            className="input is-small"
            // value={data}
            placeholder={name}
            // onChange={e => setData(e.currentTarget.value)}
          />
        </div>
      </td>
    </tr>
  );
};

export default ReplicantLabelRow;
