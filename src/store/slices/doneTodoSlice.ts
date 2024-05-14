import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TodoTypes } from "../../types";
import { dummyDoneTodos } from "../../constants/mockData";

export interface TodoState {
  value: TodoTypes[];
}
console.log(localStorage.getItem("doneTodos"));

const todos = localStorage.getItem("doneTodos")
  ? JSON.parse(localStorage.getItem("doneTodos") as string)
  : dummyDoneTodos;

const initialState: TodoState = {
  value: todos,
};

export const doneTodoSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    completeTodo: (state, action: PayloadAction<TodoTypes>) => {
      state.value = [...state.value, action.payload];
      localStorage.setItem("doneTodos", JSON.stringify(state.value));
    },
    removeDoneTodo: (state, action: PayloadAction<number>) => {
      state.value = state.value?.filter((todo) => todo.id !== action.payload);
      if (state.value.length < 1) {
        localStorage.removeItem("doneTodos");
      } else {
        localStorage.setItem("doneTodos", JSON.stringify(state.value));
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { completeTodo, removeDoneTodo } = doneTodoSlice.actions;

export default doneTodoSlice.reducer;
