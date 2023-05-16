import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type Data = {
  email: string;
  password: string;
};

export const login = createAsyncThunk("user/login", async (data: Data) => {
  console.log(11);

  try {
    const { email, password } = data;
    const res = await axios.post(`https://blog.kata.academy/api/users/login`, {
      user: { email, password },
    });
    if (res.status === 422) {
      return "чот не так";
    }
    console.log(res.data);

    return res.data;
  } catch (error) {
    throw new Error("nope");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: false,
    email: "",
    token: null,
    username: "",
    image: "",
    error: "",
  },
  reducers: {
    logOut(state) {
      state.isAuth = false;
      state.email = "";
      state.token = null;
      state.username = "";
      state.image = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        const { user } = action.payload;
        state.email = user.email;
        state.image = user.image;
        state.token = user.token;
        state.username = user.username;
      })
      .addCase(login.rejected, (state) => {
        state.error = "Что-то не так ввел или тебя не существует";
        console.log(state.error);
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
