import React from "react";
import FieldCollectionWrapper from "../../assets/wrappers/fieldCollection-wrapper";
import Field from "../field/field";

const FieldCollection = () => {
  return (
    <FieldCollectionWrapper>
      <div className="collection-page">
        <div className="items">
          <Field status="fixed" />
          <Field />
          <Field />
          <Field />
          <Field />
          <Field />
          <Field />
          <Field />
        </div>
      </div>
    </FieldCollectionWrapper>
  );
};
export default FieldCollection;
