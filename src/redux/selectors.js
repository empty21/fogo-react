import { createSelector } from "reselect";

const userSelector = state => state.user;
const uiSelector = state => state.ui;

export const isAuthenticatedSelector = createSelector(
  userSelector,
  user => user.isAuthenticated
)
export const userInfoSelector = createSelector(
  userSelector,
  user => user.data
)
export const loadingSelector = createSelector(
  uiSelector,
  ui => ui.loading
);