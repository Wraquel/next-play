import { createSlice, createAsyncThunk, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { ToastProps } from "@/components/toast";
import type { RootState } from "..";


export interface Toast extends Omit<ToastProps, "onHover" | "onExit" | "closeHandler"> {
  id?: string;
  autoClose?: boolean;
  timer?: ReturnType<typeof setTimeout>;
}

// export interface ToastState {
//   toasts: Toast []; // dictionary, the key of eache element is the toasts id
// }

export interface ToastState {
  toasts: {[id:string] : Toast}
}
// toasts: {
// "toast-1": { id: "toast-1", message: "Success" },
// "toast-2": { id: "toast-2", message: "Error" }
// }

const initialState: ToastState = {
  toasts:{}
};
// const initialState: ToastState = {
//   toasts:[]
// };

export const showToast = createAsyncThunk("toast/showToast", async (props:Toast, { dispatch }) => {
  props.id = props.id || "toast-" + Math.random().toString(36).slice(2);
  props.autoClose ??= props.variant === "success"
  if (props.autoClose) {
    props.timer = setTimeout(() => dispatch(closeToast(props.id)), 5000);
  }
  return props;
});
// thunks only accepts one payload
export const freezeToast = createAsyncThunk<Toast | null, {freeze:boolean, id: string}, {state:RootState}>(
  "toast/freezeToast", 
    async ({freeze, id}, { getState, dispatch }) => {
      const state = getState();
      const toasts = state.toasts
      const itemToast = toasts.toasts[id]
      if(freeze){
        clearInterval(itemToast?.timer)
      } else{
        itemToast ? itemToast.timer = setTimeout(() => dispatch(closeToast(id)), 2000) : null;
      }
      return null
    });

const toastSlice = createSlice({ 
  // action payload is immutable under reducer only state is mutable
  // reducers must be pure and not call setTimeOut, for exemple
  name: "toast",
  initialState,
  reducers: {
    closeToast: (state, action) => {
      delete state.toasts[action.payload]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(showToast.fulfilled, (state:ToastState,action) => {
      const toast = action.payload
      state.toasts[toast.id!] = toast // adding the element  --> state.toast[id] = toast
    })
  },
});

export const {closeToast} = toastSlice.actions;

export const selectToastsArray = createSelector(
  (state: RootState) => state.toasts.toasts,
  (toastsObject) => Object.values(toastsObject)
);

export default toastSlice.reducer;

