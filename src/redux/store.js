import { configureStore } from "@reduxjs/toolkit";
import { todoservice } from "./service/todo-api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [todoservice.reducerPath]: todoservice.reducer,
  },
  middleware: (getDefaultmiddleware) =>
    getDefaultmiddleware().concat(todoservice.middleware),
});

setupListeners(store.dispatch);
