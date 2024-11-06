interface ITodoList {
  id: string;
  name: string;
  description: string;
  task: Task[];
}

interface Task {
  id: string;
  name: string;
  description: string;
  importance: number;
}

interface IdInURL {
  id: number;
}

export type { ITodoList, IdInURL, Task };
