import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../api/authApi";
import { FormDataType } from "../components/Forms/LoginForm";
import { setAuthToken } from "../helpers";

export const getLogin = createAsyncThunk<any, FormDataType>(
  "authReducer/getLogin",
  async ({ email, password }) => {
    const response = await authAPI.login(email, password);
    setAuthToken(response.token);
  }
);

export const getRegister = createAsyncThunk<any, FormDataType>(
  "authReducer/getRegister",
  async ({ email, password }) => {
    return await authAPI.register(email, password);
  }
);

// Define a type for the slice state
interface State {
  isAuth: boolean;
  isRegister: boolean;
  isFetching: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: State = {
  isAuth: false,
  isRegister: false,
  isFetching: false,
  error: null,
};

export const authReducer = createSlice({
  name: "authReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logOut: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getLogin.pending, (state) => {
        state.error = null;
        state.isFetching = true;
      })
      .addCase(getLogin.fulfilled, (state) => {
        state.isAuth = true;
        state.isFetching = false;
      })
      .addCase(getLogin.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка запроса";
        state.isFetching = false;
      })
      .addCase(getRegister.pending, (state) => {
        state.error = null;
        state.isFetching = true;
      })
      .addCase(getRegister.fulfilled, (state) => {
        state.isRegister = true;
        state.isFetching = false;
      })
      .addCase(getRegister.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка запроса";
        state.isFetching = false;
      });
  },
});

export const { logOut, login } = authReducer.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectIsAuth = (state: RootState) => state.isAuth;

export default authReducer.reducer;
