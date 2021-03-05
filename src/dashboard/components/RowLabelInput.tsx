import React from "react";

interface RowLabelInputProps {
  name: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const RowLabelInput: React.FC<RowLabelInputProps> = ({ name, value, setValue }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        <div className="control">
          <input
            className="input is-small"
            value={value}
            placeholder={name}
            onChange={e => setValue(e.currentTarget.value)}
          />
        </div>
      </td>
    </tr>
  );
};

export default RowLabelInput;
