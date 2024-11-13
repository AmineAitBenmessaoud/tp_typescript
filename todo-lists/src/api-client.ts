import axios from "axios";
import { Task } from "./interfaces";
export const apiClient = {
  getLists: async () => {
    return axios.get("http://localhost:3000/lists").then((res) => res.data);
  },
  postToDoList: async (
    id: number,
    name: string,
    description: string,
    task: Task[]
  ) => {
    return axios
      .post("http://localhost:3000/lists", {
        id: id,
        name: name,
        description: description,
        task: task,
      })
      .then((res) => res.data);
  },
};

// apiClient
//   .getLists()
//   .then((res) => console.log("get initial : ", JSON.stringify(res.data)));

// apiClient
//   .postToDoList(0, "Test", "Ceci est un test", [
//     {
//       id: 0,
//       name: "string",
//       description: "string",
//       importance: 10,
//     },
//   ])
//   .then((res) => console.log("Test post data :", res.data));

// apiClient.getLists().then((res) => console.log("get initial : ", res.data));
