import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartReducer from "./cartSlice"

const rootReducer = {
  cart: cartReducer,
  auth: authSlice,
}

const store = configureStore({
  reducer: rootReducer,
  
})

export default store