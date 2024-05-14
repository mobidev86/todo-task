import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Todo from "./Todo";

const TodoLists = () => {
  const todos = useSelector((state: RootState) => state.todo.value);

  return (
    <div className="w-full p-4 flex flex-col mx-auto gap-8">
      <div className="flex flex-col gap-4 w-full">
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoLists;
