import React from "react";
import FieldCollection from "../components/field-collection/field-collection";
import fields from "../fields";
const UserPage = () => {
  console.log(fields);
  /* <button className="btn btn-close btn-reverse btn-block center">
  קנפג
</button>*/
  return (
    <>
      <FieldCollection fields={fields} />
    </>
  );
};
export default UserPage;
