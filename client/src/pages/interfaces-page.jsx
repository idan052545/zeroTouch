import React from "react";
import FieldCollection from "../components/field-collection/field-collection";
import { selectCurrentUser } from "../redux/user/user-selectors";
import { useSelector } from "react-redux";
import fields from "../fields";
import { updateStart } from "../redux/user/user-actions";

const UserPage = () => {
  const currentUser = useSelector(selectCurrentUser);

  /* <button className="btn btn-close btn-reverse btn-block center">
  קנפג
</button>*/

  const validateValues = async (name, toast, values) => {
    return true;
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
