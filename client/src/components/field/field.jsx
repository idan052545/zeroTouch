import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import FieldInfo from "../fieldInfo/fieldInfo";
import FieldWrapper from "../../assets/wrappers/field-wrapper";
import DropdownList from "../dropdown-list/dropdown-list";
import FormInput from "../form-input/form-input";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Field = ({
  name,
  status,
  value,
  label,
  isDropdown,
  imageUrl,
  readFrom,
  reduxUpdateFunc,
  validateValues,
}) => {
  const [hidden, setHidden] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [values, setValues] = useState(readFrom);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    console.log(value);

    setValues({ ...readFrom, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let valid = await validateValues(name, toast, values);
    console.log(valid);
    if (valid) {
      dispatch(reduxUpdateFunc(values));
      setEditMode(false);
    }
  };

  return (
    <FieldWrapper
      onClick={() => (editMode ? setHidden(false) : setHidden(!hidden))}
    >
      <header className={`${!hidden ? "hidden" : ""}`}>
        <div
          className="main-icon"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        <div className="info">
          <h5>{label}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          {editMode ? (
            isDropdown ? (
              <DropdownList
                handleChange={handleChange}
                labelText={value}
                name={name}
                list={["בחר", "b", "c", "d"]}
              />
            ) : (
              <FormInput
                type="text"
                className="s form-input"
                id={label}
                name={name}
                placeholder={value}
                handleChange={handleChange}
                required
              />
            )
          ) : (
            <FieldInfo icon={<BiChevronRight />} text={value} />
          )}

          <div className={`status ${status}`}>
            {status === "fixed" ? " קשיח" : ""}
          </div>
        </div>
        <footer>
          <div className="actions">
            {status !== "fixed" && !hidden ? (
              <button
                type="submit"
                className="btn edit-btn"
                onClick={editMode ? onSubmit : () => setEditMode(true)}
              >
                {`${editMode ? "שמור שינויים" : "ערוך"}`}
              </button>
            ) : null}
            {status !== "fixed" && !hidden && editMode ? (
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => {
                  if (editMode) setEditMode(false);
                }}
              >
                {`${editMode ? "בטל עריכה" : "מחק"}`}
              </button>
            ) : null}
          </div>
        </footer>
      </div>
    </FieldWrapper>
  );
};
export default Field;
