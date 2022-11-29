import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { selectIsFieldsLoaded } from "../redux/field/field-selectors";
import WithSpinner from "../components/withSpinner/withSpinner";
import UserPage from "./user-page";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsFieldsLoaded(state),
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(UserPage);

export default CollectionPageContainer;
