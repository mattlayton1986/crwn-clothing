import { createSelector } from "reselect";

// Input selectors
const selectUser = (state) => state.user

// Output selectors
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
)