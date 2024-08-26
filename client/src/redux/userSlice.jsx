import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    name: "",
    email: "",
    token: "",
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "users",
//   initialState: {
//     users: [],
//   },
//   reducers: {
//     getUser: (state, actions) => {
//       state.users = actions.payload.map((user) => {
//         return {
//           id: user._id,
//           name: user.name,
//           platform: user.platform,
//           email: user.email,
//           enrollmentNumber: user.enrollmentNumber,
//           password: user.password,
//         };
//       });
//     },
//     addUser:(state,action)=>{
//         state.users.push(action.payload)
//     },
//     updateUser:(state,action)=>{
//         const index = state.users.findIndex(x=>x.id===action.payload.id)
//         state.users[index]={
//             id: action.payload.id,
//             name: action.payload.name,
//             email: action.payload.email,
//             platform:action.payload.platform,
//             enrollmentNumber: action.payload.enrollmentNumber,
//             password : action.payload.password,
//         }

//     },
//     deleteUser:(state,action)=>{
//         const id= action.payload.id;
//         state.users= state.users.filter(u=>u.id !==id)
//     }
//   },
// });

// export const { getUser, addUser, updateUser, deleteUser } = userSlice.actions;
// export default userSlice.reducer;
