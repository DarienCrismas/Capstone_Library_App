import { configureStore } from "@reduxjs/toolkit";
import {reducer} from "./slices/rootSlice"

export const store = configureStore({
    reducer: reducer,
    devTools: true
})
