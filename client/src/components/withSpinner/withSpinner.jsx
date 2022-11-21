import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./sWithSpinner";

const WithSpinner = (WrapepdComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrapepdComponent {...otherProps} />
    );
  };
  return Spinner;
};
export default WithSpinner;
