import React from "react";

const HeadingRow: React.FC = ({ children }) => (
  <tr>
    <td colSpan={2}>
      <h6 className="title is-6 has-text-centered">{children}</h6>
    </td>
  </tr>
);

export default HeadingRow;
