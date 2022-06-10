import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import FieldInfo from "../fieldInfo/fieldInfo";
import FieldWrapper from "../../assets/wrappers/field-wrapper";
import DropdownList from "../dropdown-list/dropdown-list";
import FormInput from "../form-input/form-input";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { useDispatch, useSelector } from "react-redux";
import { updateStart } from "../../redux/user/user-actions";
import { toast } from "react-toastify";

const Field = ({ name, status, label, isDropdown, imageUrl }) => {
  const [hidden, setHidden] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const [values, setValues] = useState(currentUser);
  const dispatch = useDispatch();

  const regexExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi; //ip validate

  const onSubmit = async (e) => {
    e.preventDefault();
    const { network, IP, siteNumber, numOfUsers } = values;
    let check = "";
    let valid = true;
    switch (name) {
      case "network":
        check = network;
        if (!check) {
          toast.error("בבקשה מלא את השדה");
          valid = false;
        }
        break;
      case "IP":
        check = IP;
        //check if id in correct format
        if (!regexExp.test(check)) {
          toast.error("בבקשה מלא את השדה בפורמט נכון ");
          valid = false;
        }
        break;
      case "siteNumber":
        check = siteNumber;
        if (!check) {
          toast.error("בבקשה מלא את השדה");
          valid = false;
        }
        break;
      case "numOfUsers":
        check = numOfUsers;
        if (isNaN(check)) {
          toast.error("בבקשה הכנס מספר ");
          check = "";
          valid = false;
        }
        break;
      default:
    }
    if (valid) {
      dispatch(updateStart(values));
      setEditMode(false);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    console.log(values);

    setValues({ ...currentUser, [name]: value });
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
                labelText={currentUser[name]}
                name={name}
                list={["בחר", "b", "c", "d"]}
              />
            ) : (
              <FormInput
                type="text"
                className="s form-input"
                id={label}
                name={name}
                placeholder={currentUser[name]}
                handleChange={handleChange}
                required
              />
            )
          ) : (
            <FieldInfo icon={<BiChevronRight />} text={currentUser[name]} />
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
