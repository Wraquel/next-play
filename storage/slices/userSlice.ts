import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createUser, fetchUsers } from "@/services/user";
import { UserType} from "@/utils/user";

type ListUsersInitialState = {
  listUsers: UserType[];
  newUser: UserType | null;
  loading: boolean;
  error: string | null;
}

const initialState: ListUsersInitialState = {
  listUsers: [],
  newUser: null,
  loading: false,
  error: null,
};
export const addUser = createAsyncThunk("user/addUser", async (user: UserType) => {
  return await createUser(user); 
});

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  return await fetchUsers();
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.newUser = action.payload
    },
    clearUser: (state) => {
      state.newUser = null;
  }
  },
  extraReducers: (builder) => {
    builder
      // addUser
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.listUsers.push(action.payload);
      })
      .addCase(addUser.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      })

      // getUsers
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.listUsers = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export const {setUser,clearUser} = userSlice.actions;

export default userSlice.reducer;

