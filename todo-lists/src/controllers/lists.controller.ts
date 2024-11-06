import { FastifyReply, FastifyRequest } from "fastify";
import { ITodoList, IdInURL, Task } from "../interfaces";

let task1: Task[] = [
  {
    id: "string",
    name: "string",
    description: "string",
    importance: 10,
  },
];

let task2: Task[] = [
  {
    id: "string",
    name: "string",
    description: "string",
    importance: 10,
  },
];

let staticLists: ITodoList[] = [
  {
    id: "l-1",
    name: "Develop",
    description: "Dev tasks",
    task: task1,
  },
  {
    id: "TP Agda",
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

export const changeElem = async (
  request: FastifyRequest<{ Params: IdInURL }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  let arg = request.body as Partial<ITodoList>;

  Promise.resolve(staticLists).then((item) => {
    let itemChanged: ITodoList = item[id];
    itemChanged.id = arg.id ? arg.id : itemChanged.id;
    itemChanged.name = arg.name ? arg.name : itemChanged.name;
    itemChanged.description = arg.description
      ? arg.description
      : itemChanged.description;
    itemChanged.task = arg.task ? arg.task : itemChanged.task;
    reply.send({ data: itemChanged });
  });
};

export const delTask = async (
  request: FastifyRequest<{ Params: IdInURL }>,
  reply: FastifyReply
) => {
  const param = request.params;
  reply.send({ data: param });
  // Promise.resolve(staticLists).then((item) => {
  //   item.splice(id, 1);
  //   reply.send({ data: item });
  // });
};
