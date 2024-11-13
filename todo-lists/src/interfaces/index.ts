export interface ITodoList {
  id: number;
  name: string;
  description: string;
  task: Task[];
}

export interface Task {
  id: number;
  name: string;
  description: string;
  importance: number;
}

export interface IdInURL {
  id: number;
}

export interface IdInUrlTask {
  idList: number;
  idTask: number;
}
