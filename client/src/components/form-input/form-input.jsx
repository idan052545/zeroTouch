import React from "react";

import "./form-input.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="form-row">
    <input value={otherProps.value} onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`${otherProps.value.length ? "shrink" : " "}
     } form-input-label form form-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
