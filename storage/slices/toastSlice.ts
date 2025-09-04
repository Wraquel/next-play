import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ToastProps } from "@/components/toast";

export interface Toast extends Omit<ToastProps, "onHover" | "onExit" | "closeHandler"> {
  id?: string;
  autoClose?: boolean;
  // duration?: number;
  // timer?: ReturnType<typeof setTimeout>;
}

export interface ToastState {
  toasts: Toast []; // dictionary, the key of eache element is the toasts id
}

// export interface ToastState {
//   toasts: {[id:string] : Toast}; // dictionary, the key of eache element is the toasts id
// }
// toasts: {
// "toast-1": { id: "toast-1", message: "Success" },
// "toast-2": { id: "toast-2", message: "Error" }
// }
// const initialState: ToastState = {
//   toasts:{}
// };
const initialState: ToastState = {
  toasts:[]
};

export const showToast = createAsyncThunk("toast/showToast", async (props:Toast, { dispatch }) => {
  console.log(props, "PROPs")
  props.id = props.id || "toast-" + Math.random().toString(36).slice(2);
  // props.autoClose ??= props.variant === "success" || props.variant === "brand";
  if (props.autoClose) {
    setTimeout(() => dispatch(closeToast(props.id)), 5000);
  }
  return props;
});

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    closeToast: (state, action) => {
      state.toasts= state.toasts.filter(t => t.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(showToast.fulfilled, (state:ToastState,action) => {
      const toast = action.payload
      state.toasts.push(toast)
      // state.toasts[toast.id!] = toast //adding the element  --> state.toast[id] = toast
    })
  },
});

export const {closeToast} = toastSlice.actions;

export default toastSlice.reducer;

