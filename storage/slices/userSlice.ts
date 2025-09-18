import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createUser, fetchUser, fetchUsers, updateUser } from "@/services/user";
import { showToast } from "./toastSlice";
import { UserType} from "@/utils/user";

type ListUsersInitialState = {
  listUsers: {[id:string] : UserType};
  newUser: UserType | null;
  user: UserType | null;
  loading: boolean;
  error: string | null;
}

const initialState: ListUsersInitialState = {
  listUsers: {},
  newUser: null,
  user: null,
  loading: false,
  error: null,
};
export const addUser = createAsyncThunk("user/addUser", async (user: UserType, {rejectWithValue, dispatch}) => {
  try{
    const response = await createUser(user); 
    if(response){
      dispatch(showToast({ variant: "success", message: "Success"}));
      dispatch(showToast({ variant: "warning", message: "You will not receive Newsletter", autoClose:false }));
    }
    return response
  } catch(error) {
    const message = error
    dispatch(showToast({ variant: "error", message:"ERROR", autoClose:true }));
    return rejectWithValue(message)
  } 
});

export const updateProfile = createAsyncThunk("user/updateProfile", async (user: UserType, {rejectWithValue, dispatch}) => {
  try{
    const response = await updateUser(user);
    if(response) dispatch(getUser(user.id!))
    return response
  } catch(error) {
    const message = error
    dispatch(showToast({ variant: "error", message:"ERROR", autoClose:true }));
    return rejectWithValue(message)
  } 
});

export const getUser = createAsyncThunk("users/getUser", async (userId: string) => {
  return await fetchUser(userId); 
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
        state.listUsers[action.payload.id!]=action.payload;
      })
      .addCase(addUser.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      })

      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.listUsers[action.payload.id!] = action.payload;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      })

      // getUser
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      })

      // getUsers
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.listUsers = {};
        action.payload.forEach((user:UserType) => {
          state.listUsers[user.id!] = user;
        } )
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export const {setUser,clearUser} = userSlice.actions;

export default userSlice.reducer;

