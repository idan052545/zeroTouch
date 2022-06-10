import React from "react";
import FieldCollectionWrapper from "../../assets/wrappers/fieldCollection-wrapper";
import Field from "../field/field";

const FieldCollection = ({ fields }) => {
  return (
    <FieldCollectionWrapper>
      <div className="collection-page">
        <div className="items">
          {fields?.map(({ id, ...otherCollectionProps }) => (
            <Field key={id} {...otherCollectionProps} />
          ))}
        </div>
      </div>
    </FieldCollectionWrapper>
  );
};
export default FieldCollection;
