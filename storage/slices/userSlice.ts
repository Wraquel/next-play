import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser, updateUser } from "@/services/user";
import { showToast } from "./toastSlice";
import { UserType} from "@/utils/user";

type UserInitialState = {
  user: UserType | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserInitialState = {
  user: null,
  loading: false,
  error: null,
};

export const updateProfile = createAsyncThunk("users/updateProfile", async (user: UserType, {rejectWithValue, dispatch}) => {
  try{
    const response = await updateUser(user);
    if(response){
      dispatch(showToast({ variant: "success", message: "Success_AutoClose TOAST", autoClose:true }));    }
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


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.user = action.payload;
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
  },
});

export default userSlice.reducer;

