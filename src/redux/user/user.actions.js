import UserActionTypes from "./user.types";

export function setCurrentUser(user) {
  return {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user,
  };
}

export function isFetching() {
  return {
    type: UserActionTypes.IS_FETCHING,
  };
}
export function clearIsFetching() {
  return {
    type: UserActionTypes.CLEAR_IS_FETCHING,
  };
}
