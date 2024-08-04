import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoservice = createApi({
  reducerPath: "todo_api",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3600",
    headers: { Authorization: "Bearer jbefuwbef3h0faepfapiefnape" },
  }),
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => ({
        url: "/todos",
      }),
      providesTags: ["get-todo"],
    }),
    createTodo: build.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["get-todo"],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["get-todo"],
    }),
    updateTodo: build.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["get-todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoservice;
