import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// reducers
import user from "./user/user.reducer";
import flash from "./flash/flash.reducer";

const store = configureStore({
  reducer: { user, flash },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
