import { createSelector } from "@reduxjs/toolkit";

export const selectCurrentUser = createSelector(
    [(state) => state.user],
    (user) => user.currentUser
);



