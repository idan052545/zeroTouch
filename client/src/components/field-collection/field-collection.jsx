import React from "react";
import FieldCollectionWrapper from "../../assets/wrappers/fieldCollection-wrapper";
import Field from "../field/field";

const FieldCollection = () => {
  return (
    <FieldCollectionWrapper>
      <div className="fields">
        <Field />
        <Field />
        <Field />
        <Field />
      </div>
    </FieldCollectionWrapper>
  );
};
export default FieldCollection;
