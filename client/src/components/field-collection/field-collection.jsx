import React from "react";
import FieldCollectionWrapper from "../../assets/wrappers/fieldCollection-wrapper";
import Field from "../field/field";

const FieldCollection = ({ fields, readFrom }) => {
  return (
    <FieldCollectionWrapper>
      <div className="collection-page">
        <div className="items">
          {fields?.map(({ id, name, ...otherCollectionProps }) => (
            <Field
              key={id}
              name={name}
              value={readFrom[name]}
              {...otherCollectionProps}
              readFrom={readFrom}
            />
          ))}
        </div>
      </div>
    </FieldCollectionWrapper>
  );
};
export default FieldCollection;
