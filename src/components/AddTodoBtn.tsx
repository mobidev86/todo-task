import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TodoTypes } from "../types";
import { addTodo } from "../store/slices/todoSlice";
import { useDispatch } from "react-redux";

const AddTodoBtn = () => {
  const addTodoRef: any = useRef(null);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoTypes>();
  const onSubmit: SubmitHandler<TodoTypes> = (data) => {
    dispatch(addTodo({ ...data, id: new Date().getTime() }));
    reset();
    addTodoRef.current?.close();
  };
  return (
    <>
      <div>
        <button
          onClick={() => addTodoRef.current?.showModal()}
          className="btn btn-accent"
        >
          Add Todo
        </button>
      </div>
      <dialog id="modal_2" ref={addTodoRef} className="modal w-full h-full">
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

export default AddTodoBtn;
