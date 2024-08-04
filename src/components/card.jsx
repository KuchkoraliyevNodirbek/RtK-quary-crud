import React, { useState } from "react";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../redux/service/todo-api"; // To'g'ri pathni tekshiring

export const Card = ({ id, title, description }) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleDelete = async () => {
    try {
      await deleteTodo(id).unwrap();
      console.log("Todo deleted successfully");
    } catch (error) {
      console.error("Failed to delete the todo:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        title: editedTitle,
        description: editedDescription,
      };
      await updateTodo({ id, data: updatedData }).unwrap();
      console.log("Todo updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update the todo:", error);
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-6 mb-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h1 className="mb-4 text-2xl font-bold">{editedTitle}</h1>
          <p className="mb-4">{editedDescription}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
