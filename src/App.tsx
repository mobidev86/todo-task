import AddTodoBtn from "./components/AddTodoBtn";
import CompletedTodos from "./components/CompletedTodos";
import TodoLists from "./components/TodoLists";

function App() {
  return (
    <div className="flex flex-col gap-2">
      <div className="self-center mt-8">
        <AddTodoBtn />
      </div>
      <div className="h-screen max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto p-8 flex justify-center ">
        <div className="h-[90%] w-full flex min-w-[750px] border border-white rounded-lg">
          <div className="h-full overflow-y-auto w-[50%] p-8 border border-r-white">
            <h1 className="text-xl text-center font-bold mb-8">
              Pending Todos.
            </h1>
            <TodoLists />
          </div>
          <div className="h-full overflow-y-auto w-[50%] p-8">
            <h1 className="text-xl text-center font-bold mb-8">
              Completed Todos
            </h1>
            <CompletedTodos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
