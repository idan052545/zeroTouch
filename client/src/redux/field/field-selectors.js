import { createSelector } from "reselect";

const selectFields = (state) => state.field;
// const selectFields = (state) => {
//   console.log(state);
//   // state.field;
// };

export const selectFieldsArray = createSelector(
  [selectFields],
  (field) => field.fields
);

export const selectIsFieldsFetching = createSelector(
  [selectFields],
  (field) => field.isFetching
);

export const selectIsFieldsLoaded = createSelector(
  [selectFields],
  (field) => !!field.fields
);
