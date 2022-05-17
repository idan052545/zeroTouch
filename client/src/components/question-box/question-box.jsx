import React from "react";

import { FaQuestionCircle } from "react-icons/fa";
import FormInput from "../form-input/form-input";

const QuestionBox = ({ label }) => (
  <>
    <h3 className=" btn btn-reverse btn-block">
      <FaQuestionCircle />
      {label}
    </h3>
    <FormInput
      type="text"
      className="form form-group"
      id={label}
      name={label}
      placeholder={label}
      required
    />
  </>
);
export default QuestionBox;
