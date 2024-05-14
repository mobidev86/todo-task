import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import FadedTodo from "./FadedTodo";

const CompletedTodos = () => {
  const todos = useSelector((state: RootState) => state.completedTodo.value);
  return (
    <div className="w-full p-4 flex flex-col mx-auto gap-8">
      {todos.map((todo) => (
        <FadedTodo key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default CompletedTodos;
