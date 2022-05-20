import React from "react";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import FieldInfo from "../fieldInfo/fieldInfo";
import FieldWrapper from "../../assets/wrappers/field-wrapper";
const Field = () => {
  return (
    <FieldWrapper>
      <header>
        <div className="main-icon">{"Simantov"}</div>
        <div className="info">
          <h5>{"Simantov"}</h5>
          <p>{"Simantov"}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <FieldInfo icon={<FaLocationArrow />} text="Idan" />
          <FieldInfo icon={<FaCalendarAlt />} text="Siman" />
          <FieldInfo icon={<FaBriefcase />} text="Tov" />
        </div>
        <footer>
          <div className="actions">
            <div to="/" className="btn edit-btn">
              Edit
            </div>
            <button type="button" className="btn delete-btn">
              delete
            </button>
          </div>
        </footer>
      </div>
    </FieldWrapper>
  );
};
export default Field;
