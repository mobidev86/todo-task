import { useRef } from "react";
import { TodoTypes } from "../types";
import { useDispatch } from "react-redux";
import { completeTodo } from "../store/slices/doneTodoSlice";
import { editTodo, removeTodo } from "../store/slices/todoSlice";
import { MdDeleteForever } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";

const Todo = ({ id, title, description }: TodoTypes) => {
  const todoRef: any = useRef(null);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoTypes>({ defaultValues: { title, description, id } });
  const onSubmit: SubmitHandler<TodoTypes> = (data) => {
    dispatch(editTodo(data));
    reset();
    todoRef.current?.close();
  };

  const markAsDone = (e: any) => {
    if (e.target.checked === true) {
      dispatch(removeTodo(id as number));
      dispatch(completeTodo({ id, title, description }));
    }
  };
  return (
    <>
      <div className="flex flex-row gap-4 items-center justify-between w-full">
        <div
          className="tooltip cursor-pointer truncate"
          data-tip={title}
          onClick={() => {
            todoRef.current?.showModal();
          }}
        >
          {title}
        </div>
        <div className="flex flex-row gap-4 items-center">
          <input
            type="checkbox"
            className="checkbox checkbox-success"
            onChange={(e) => markAsDone(e)}
          />
          <span
            className="cursor-pointer"
            onClick={() => dispatch(removeTodo(id as number))}
          >
            <MdDeleteForever color="white" size={25} />
          </span>
        </div>
      </div>
      <dialog id="modal_2" ref={todoRef} className="modal w-full h-full">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={() => reset()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center mb-8">Add Todo!</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <label className="form-control">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <textarea
                className={`textarea textarea-bordered ${
                  errors.title && "textarea-error"
                } h-24`}
                placeholder="Go for a walk..."
                {...register("title", { required: true })}
              ></textarea>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Complete 1000 steps today..."
                {...register("description")}
              ></textarea>
            </label>
            <button type="submit" className="btn">
              Add
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Todo;
