import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import FieldInfo from "../fieldInfo/fieldInfo";
import FieldWrapper from "../../assets/wrappers/field-wrapper";
const Field = ({ status }) => {
  const INITIAL_STATE = {
    hidden: true,
  };

  const [hidden, setHidden] = useState(INITIAL_STATE);

  return (
    <FieldWrapper onClick={() => setHidden(!hidden)}>
      <header className={`${!hidden ? "hidden" : ""}`}>
        <div className="main-icon">{"S"}</div>
        <div className="info">
          <h5>{"Simantov"}</h5>
          <p>{"Simantov"}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <FieldInfo icon={<BiChevronRight />} text="Idan" />
          <div className={`status ${status}`}>
            {" "}
            {status === "fixed" ? " קשיח" : ""}
          </div>
        </div>
        <footer>
          <div className="actions">
            {status !== "fixed" && !hidden ? (
              <Link to="/" className="btn edit-btn">
                ערוך
              </Link>
            ) : null}
            {status !== "fixed" && !hidden ? (
              <button type="button" className="btn delete-btn">
                מחק
              </button>
            ) : null}
          </div>
        </footer>
      </div>
    </FieldWrapper>
  );
};
export default Field;
