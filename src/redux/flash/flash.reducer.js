const initialState = [];

export default function flashReducer(state = initialState, action) {
  switch (action.type) {
    case "PUSH_FLASH": {
      return [...state, { id: Date.now().toString(), ...action.payload }];
    }
    case "CLEAR_FLASH":
      return state.filter((flash) => flash.id !== action.payload);
    default:
      return state;
  }
}
