import { nanoid } from "@reduxjs/toolkit";
import { Card } from "./components/card";
import { useForm } from "react-hook-form";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
} from "./redux/service/todo-api";

function App() {
  const { error, data, isLoading } = useGetTodosQuery();
  const [createTodo, { isLoading: createLoading }] = useCreateTodoMutation();
  const { handleSubmit, register, reset } = useForm();

  const submit = (data) => {
    createTodo(data)
      .unwrap()
      .catch((error) => {
        console.log(error);
      });
    reset();
  };

  return (
    <>
      <div className="container mx-auto p-6">
        {createLoading ? (
          <h2 className="text-center text-xl">Loading...</h2>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit(submit)} className="mb-6">
          <div className="mb-4">
            <input
              className="bg-blue-300 p-4 w-full rounded border border-gray-300"
              {...register("title")}
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-blue-300 p-4 w-full rounded border border-gray-300"
              {...register("description")}
              type="text"
              placeholder="Description"
            />
          </div>
          <button
            className="bg-red-500 text-white p-4 w-full rounded"
            type="submit"
          >
            Send
          </button>
        </form>
        {isLoading ? (
          <h1 className="text-center text-xl">Loading...</h1>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => (
              <Card key={nanoid()} {...item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
