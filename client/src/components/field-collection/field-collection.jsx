import React from "react";
import FieldCollectionWrapper from "../../assets/wrappers/fieldCollection-wrapper";
import Field from "../field/field";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { useSelector } from "react-redux";

const FieldCollection = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <FieldCollectionWrapper>
      <div className="collection-page">
        <div className="items">
          <Field label="IP" value={currentUser.payload.IP} status="fixed" />
          <Field label="רשת" value={currentUser.payload.network} />
          <Field label="מספר אתר" value={currentUser.payload.siteNumber} />
          <Field label="מספר משתמשים" value={currentUser.payload.numOfUsers} />
        </div>
      </div>
    </FieldCollectionWrapper>
  );
};
export default FieldCollection;
