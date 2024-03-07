import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";

export const getUsers = createAsyncThunk(
  "usersReducer/getUsers",
  async (page: number) => {
    return await usersApi.getUsers(page);
  }
);

export interface UserType {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

// Define a type for the slice state
interface State {
  users: UserType[];
  totalPages: number | null;
  currentPage: number;
  isFetching: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: State = {
  users: [],
  totalPages: null,
  currentPage: 1,
  isFetching: false,
  error: null,
};

export const usersReducer = createSlice({
  name: "usersReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currentPage += 1;
    },
    previosPage: (state) => {
      state.currentPage -= 1;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getUsers.pending, (state) => {
        state.error = null;
        state.isFetching = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = [...action.payload.data];
        state.totalPages = action.payload.total_pages;
        state.isFetching = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка запроса";
        state.isFetching = false;
      });
  },
});

export const { nextPage, previosPage } = usersReducer.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectIsAuth = (state: RootState) => state.isAuth;

export default usersReducer.reducer;
