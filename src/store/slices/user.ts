import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types/User";

export const login = createAsyncThunk("user/login", async (data: User) => {
  try {
    const { email, password } = data;
    const res = await axios.post(`https://blog.kata.academy/api/users/login`, {
      user: { email, password },
    });
    if (res.status === 422) {
      return "чот не так";
    }
    return res.data;
  } catch (error) {
    throw new Error("nope");
  }
});

export const createNewUser = createAsyncThunk(
  "user/SignUp",
  async (data: User) => {
    try {
      const { email, password, username } = data;
      const res = await axios.post(`https://blog.kata.academy/api/users/`, {
        user: { username, email, password },
      });
      if (res.status === 422) {
        return "чот не так";
      }
      console.log(res.data);

      return res.data;
    } catch (error) {
      throw new Error("nope");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/Update",
  async ({ data, token }: { data: User; token: string | null }) => {
    try {
      const { email, password, username } = data;
      const res = await axios.put(
        `https://blog.kata.academy/api/user`,
        {
          user: { username, email, password },
        },
        { headers: { Authorization: token && `Token ${token}` } }
      );
      if (res.status === 422) {
        return "чот не так";
      }
      return res.data;
    } catch (error) {
      throw new Error("nope");
    }
  }
);

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
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.isAuth = true;
        const { user } = action.payload;

        state.email = user.email;
        state.image =
          "https://static.productionready.io/images/smiley-cyrus.jpg";
        state.token = user.token;
        state.username = user.username;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        console.log(user);

        state.email = user.email;
        state.username = user.username;
        state.image = user.image ? user.image : state.image;
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
