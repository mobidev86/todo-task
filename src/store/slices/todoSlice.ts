import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TodoTypes } from "../../types";
import { dummyTodos } from "../../constants/mockData";

export interface TodoState {
  value: TodoTypes[];
}

const todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos") as string)
  : dummyTodos;

const initialState: TodoState = {
  value: todos,
};

export const todoSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoTypes>) => {
      state.value = [action.payload, ...state.value];
      localStorage.setItem("todos", JSON.stringify(state.value));
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.value = state.value?.filter((todo) => todo.id !== action.payload);
      if (state.value.length < 1) {
        localStorage.removeItem("todos");
      } else {
        localStorage.setItem("todos", JSON.stringify(state.value));
      }
    },
    editTodo: (state, action: PayloadAction<TodoTypes>) => {
      state.value = state.value.map((item) =>
        item.id === action.payload.id ? (item = action.payload) : item
      );
      localStorage.setItem("todos", JSON.stringify(state.value));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
