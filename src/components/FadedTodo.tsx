import { useDispatch } from "react-redux";
import { TodoTypes } from "../types";
import { removeDoneTodo } from "../store/slices/doneTodoSlice";
import { addTodo } from "../store/slices/todoSlice";
import { MdDeleteForever } from "react-icons/md";

const FadedTodo = ({ id, title, description }: TodoTypes) => {
  const dispatch = useDispatch();
  const markAsDone = (e: any) => {
    if (e.target.checked !== true) {
      dispatch(removeDoneTodo(id as number));
      dispatch(addTodo({ id, title, description }));
    }
  };

  return (
    <div className="flex flex-row gap-4 items-center justify-between w-full opacity-85">
      <div
        className="tooltip cursor-pointer truncate line-through"
        data-tip={title}
      >
        {title}
      </div>
      <div className="flex flex-row gap-4 items-center">
        <input
          type="checkbox"
          defaultChecked
          className="checkbox checkbox-success"
          onChange={(e) => markAsDone(e)}
        />
        <span
          className="cursor-pointer"
          onClick={() => dispatch(removeDoneTodo(id as number))}
        >
          <MdDeleteForever color="white" size={25} />
        </span>
      </div>
    </div>
  );
};

export default FadedTodo;
