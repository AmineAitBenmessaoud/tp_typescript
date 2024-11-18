import axios from "axios";
import { Task, ITodoList } from "./interfaces";

export const apiClient = {
  // Fetch all to-do lists
  getLists: async () => {
    return axios.get("http://localhost:3000/").then((res) => res.data);
  },

  // Add a new to-do list
  postToDoList: async (list: ITodoList) => {
    return axios
      .post("http://localhost:3000/", list)
      .then((res) => res.data);
  },

  // Update a to-do list by ID
  putToDoList: async (id: number, updatedList: Partial<ITodoList>) => {
    return axios
      .put(`http://localhost:3000/${id}`, updatedList)
      .then((res) => res.data);
  },

  // Add a new task to a specific list
  postTask: async (id: number, task: Task) => {
    return axios
      .post(`http://localhost:3000/${id}/items`, task)
      .then((res) => res.data);
  },

  // Delete a task from a specific list
  deleteTask: async (idList: number, idTask: number) => {
    return axios
      .delete(`http://localhost:3000/${idList}/items/${idTask}`)
      .then((res) => res.data);
  },

  // Update a specific task in a list
  putTask: async (
    idList: number,
    idTask: number,
    updatedTask: Partial<Task>
  ) => {
    return axios
      .put(`http://localhost:3000/${idList}/items/${idTask}`, updatedTask)
      .then((res) => res.data);
  },
};
