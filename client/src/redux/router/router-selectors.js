import { createSelector } from "reselect";

const selectRouter = (state) => state.router;

export const selectTopology = createSelector(
  [selectRouter],
  (router) => router.topology
);

export const selectIsFetching = createSelector(
  [selectRouter],
  (router) => router.isFetching
);

export const selectIsTopologyLoaded = createSelector(
  [selectRouter],
  (router) => !!router.topology
);

export const selectConfigResult = createSelector(
  [selectRouter],
  (router) => router.command_result
);

export const selectShowResult = createSelector(
  [selectRouter],
  (router) => router.command_result
);
