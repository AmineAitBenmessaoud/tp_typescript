import { FastifyReply, FastifyRequest } from "fastify";
import { ITodoList, IdInURL, Task, IdInUrlTask } from "../interfaces";

let task1: Task[] = [
  {
    id: 0,
    name: "string",
    description: "string",
    importance: 10,
  },
];

let task2: Task[] = [
  {
    id: 0,
    name: "string",
    description: "string",
    importance: 10,
  },
];

let staticLists: ITodoList[] = [
  {
    id: 0,
    name: "Develop",
    description: "Dev tasks",
    task: task1,
  },
  {
    id: 1,
    name: "Flemme",
    description: "Dev tasks",
    task: task2,
  },
];

export async function listLists(request: FastifyRequest, reply: FastifyReply) {
  console.log("DB status", this.level.db.status);
  const listsIter = this.level.db.iterator();

  const result: ITodoList[] = [];
  for await (const [key, value] of listsIter) {
    result.push(JSON.parse(value));
  }
  reply.send({ data: result });
}

export async function addList(request: FastifyRequest, reply: FastifyReply) {
  const list = request.body as ITodoList;
  const result = await this.level.db.put(
    list.id.toString(),
    JSON.stringify(list)
  );
  reply.send({ data: result });
}

export async function changeElem(
  request: FastifyRequest<{ Params: IdInURL }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  let arg = request.body as Partial<ITodoList>;
  console.log("DB status", this.level.db.status);

  const listsIter = this.level.db.iterator();

  const result: ITodoList[] = [];
  for await (const [key, value] of listsIter) {
    let changedValue: ITodoList = JSON.parse(value);
    if (changedValue.id == id) {
      changedValue.id = arg.id ? arg.id : changedValue.id;
      changedValue.name = arg.name ? arg.name : changedValue.name;
      changedValue.description = arg.description
        ? arg.description
        : changedValue.description;
      changedValue.task = arg.task ? arg.task : changedValue.task;

      const result = await this.level.db.put(
        changedValue.id,
        JSON.stringify(changedValue)
      );

      reply.send({ data: changedValue });
    }
  }
}

export async function addItem(
  request: FastifyRequest<{ Params: IdInURL }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  let arg: Task = request.body as Task;
  console.log("DB status", this.level.db.status);
  let listsIter = this.level.db.iterator();

  for await (const [key, value] of listsIter) {
    let listToChange: ITodoList = JSON.parse(value);
    if (listToChange.id == id) {
      listToChange.task.push(arg);

      const result = await this.level.db.put(
        listToChange.id,
        JSON.stringify(listToChange)
      );

      reply.send({ data: result });
    }
  }
}

export async function delTask(
  request: FastifyRequest<{ Params: IdInUrlTask }>,
  reply: FastifyReply
) {
  const { idList, idTask } = request.params;

  let arg: Task = request.body as Task;
  console.log("DB status", this.level.db.status);
  let index: number = 0;
  let listsIter = this.level.db.iterator();

  for await (const [key, value] of listsIter) {
    let listToChange: ITodoList = JSON.parse(value);
    if (listToChange.id == idList) {
      let indexOfTaskToRemove: number = 0;
      for (const elem of listToChange.task) {
        if (elem.id == idTask) {
          break;
        }
        indexOfTaskToRemove++;
      }

      listToChange.task.splice(indexOfTaskToRemove, 1);

      const result = await this.level.db.put(
        listToChange.id,
        JSON.stringify(listToChange)
      );

      reply.send({ data: result });
    }
  }
}

export async function changeItem(
  request: FastifyRequest<{ Params: IdInUrlTask }>,
  reply: FastifyReply
) {
  const { idList, idTask } = request.params;

  let arg: Partial<Task> = request.body as Partial<Task>;
  console.log("DB status", this.level.db.status);
  let listsIter = this.level.db.iterator();

  for await (const [key, value] of listsIter) {
    let listToChange: ITodoList = JSON.parse(value);
    if (listToChange.id == idList) {
      let indexOfTaskToChante: number = 0;

      for (const elem of listToChange.task) {
        if (elem.id == idTask) {
          // We need to change the Task
          const task = listToChange.task[indexOfTaskToChante];

          task.id = arg.id ? arg.id : task.id;
          task.name = arg.name ? arg.name : task.name;
          task.description = arg.description
            ? arg.description
            : task.description;
          task.importance = arg.importance ? arg.importance : task.importance;

          listToChange.task[indexOfTaskToChante] = task;

          const result = await this.level.db.put(
            listToChange.id,
            JSON.stringify(listToChange)
          );

          reply.send({ data: result });
        }
        indexOfTaskToChante++;
      }
    }
  }
}
