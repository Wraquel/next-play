import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createUser, fetchUsers } from "@/services/user";
import { showToast } from "./toastSlice";
import { UserType} from "@/utils/user";

type ListUsersInitialState = {
  listUsers: {[id:string] : UserType};
  newUser: UserType | null;
  loading: boolean;
  error: string | null;
}

const initialState: ListUsersInitialState = {
  listUsers: {},
  newUser: null,
  loading: false,
  error: null,
};
export const addUser = createAsyncThunk("users/addUser", async (user: UserType, {rejectWithValue, dispatch}) => {
  try{
    const response = await createUser(user); 
    if(response){
      dispatch(showToast({ variant: "success", message: "Success_AutoClose TOAST", autoClose:true }));
      dispatch(showToast({ variant: "warning", message: "Warning_Close me TOAST", autoClose:false }));
    }
    return response
  } catch(error) {
    const message = error
    dispatch(showToast({ variant: "error", message:"ERROR_TOAST", autoClose:true }));
    return rejectWithValue(message)
  } 
});

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  return await fetchUsers(); 
});

const usersSlice = createSlice({
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

export const {setUser,clearUser} = usersSlice.actions;

export default usersSlice.reducer;

