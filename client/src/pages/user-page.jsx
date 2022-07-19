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
  return (
    <>
      <FieldCollection
        fields={fields}
        readFrom={currentUser}
        reduxUpdateFunc={updateStart}
      />
    </>
  );
};
export default UserPage;
