import UserActionTypes from "./user.types";
const initialState = {
  currentUser: null,
  isFetching: true,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload, isFetching: false };
    case UserActionTypes.IS_FETCHING:
      return { ...state, isFetching: true };
    case UserActionTypes.CLEAR_IS_FETCHING:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}
