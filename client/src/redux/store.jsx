import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import managerReducer from "./managerSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    managers: managerReducer,
  },
});

export default store;
