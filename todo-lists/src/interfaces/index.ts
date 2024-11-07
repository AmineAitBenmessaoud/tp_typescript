interface ITodoList {
  id: number;
  name: string;
  description: string;
  task: Task[];
}

interface Task {
  id: number;
  name: string;
  description: string;
  importance: number;
}

interface IdInURL {
  id: number;
}

interface IdInUrlTask {
  idList: number;
  idTask: number;
}

export type { ITodoList, IdInURL, Task, IdInUrlTask };
