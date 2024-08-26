import { createSlice } from "@reduxjs/toolkit";
const managerSlice = createSlice({
  name: "managers",
  initialState: {
    managers: [],
  },
  reducers: {
    getManager: (state, actions) => {
      state.managers = actions.payload.map((manager) => {
        return {
          id: manager._id,
          name: manager.name,
          platform: manager.platform,
          email: manager.email,
          enrollmentNumber: manager.enrollmentNumber,
          password: manager.password,
        };
      });
    },
    addManager: (state, action) => {
      state.managers.push(action.payload);
    },
    updateManager: (state, action) => {
      const index = state.managers.findIndex((x) => x.id === action.payload.id);
      state.managers[index] = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        platform: action.payload.platform,
        enrollmentNumber: action.payload.enrollmentNumber,
        password: action.payload.password,
      };
    },
    deleteManager: (state, action) => {
      const id = action.payload.id;
      state.managers = state.managers.filter((u) => u.id !== id);
    },
  },
});

export const { getManager, addManager, updateManager, deleteManager } =
  managerSlice.actions;
export default managerSlice.reducer;
