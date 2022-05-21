import React from "react";

const DropdownList = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="form-row">
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default DropdownList;
