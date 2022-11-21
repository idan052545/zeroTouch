import React, { useEffect } from "react";
import FieldCollection from "../components/field-collection/field-collection";
import { selectCurrentUser } from "../redux/user/user-selectors";
import { useSelector } from "react-redux";
// import fields from "../fields";
import { updateStart } from "../redux/user/user-actions";
import {
  selectFieldsArray,
  selectIsFieldsLoaded,
} from "../redux/field/field-selectors";
//import WithSpinner from "../components/withSpinner/withSpinner";

const UserPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const fields = useSelector(selectFieldsArray);
  let isLoading = !useSelector(selectIsFieldsLoaded);

  useEffect(() => {}, [isLoading]);

  /* <button className="btn btn-close btn-reverse btn-block center">
  קנפג
</button>*/

  const validateValues = async (name, toast, values) => {
    const regexExp =
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi; //ip validate
    const check = values[name];
    let valid = true;
    if (!check) {
      toast.error("בבקשה מלא את השדה");
      valid = false;
    }
    if (name === "IP" && !regexExp.test(check)) {
      toast.error("בבקשה מלא את השדה בפורמט נכון ");
      valid = false;
    }
    if (name === "numOfUsers" && isNaN(check)) {
      toast.error("בבקשה הכנס מספר ");
      valid = false;
    }
    return valid;
  };

  return (
    <>
      <FieldCollection
        fields={fields}
        readFrom={currentUser}
        reduxUpdateFunc={updateStart}
        validateValues={validateValues}
      />
    </>
  );
};
export default UserPage;
