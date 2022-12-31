import React, { useState } from "react";
import FieldCollectionWrapper from "../../assets/wrappers/fieldCollection-wrapper";
import Field from "../field/field";

const FieldCollection = ({
  fields,
  readFrom,
  reduxUpdateFunc,
  validateValues,
}) => {
  const [show, setShow] = useState(false);

  return (
    <FieldCollectionWrapper>
      <div className="collection-page">
        <button className="expander-button" onClick={() => setShow(!show)}>
          {show ? "Hide Fields" : "Show Fields"}
        </button>
        <div className={`items ${show ? "show" : "hide"}`}>
          {fields?.map(
            ({ name, images, status, ...otherCollectionProps }, index) => (
              <Field
                key={index}
                name={name}
                imageUrl={images[0]?.image}
                value={readFrom[name]}
                status={status === "F" ? "fixed" : ""}
                {...otherCollectionProps}
                readFrom={readFrom}
                reduxUpdateFunc={reduxUpdateFunc}
                validateValues={validateValues}
              />
            )
          )}
        </div>
      </div>
    </FieldCollectionWrapper>
  );
};
export default FieldCollection;
