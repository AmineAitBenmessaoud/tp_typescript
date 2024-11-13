import { FastifyInstance } from "fastify";
import {
  addListSchema,
  changeItemSchema,
  delItemSchema,
  listListsSchema,
  postItemSchema,
  putListSchema,
} from "../../schemas";
import * as listsController from "../../controllers/lists.controller";

async function lists(fastify: FastifyInstance) {
  fastify.get("/", listListsSchema, listsController.listLists);

  // TODO implement addList in controller
  fastify.post("/", addListSchema, listsController.addList);

  fastify.put("/:id", putListSchema, listsController.changeElem);

  fastify.post("/:id/items", postItemSchema, listsController.addItem);

  fastify.delete(
    "/:idList/items/:idTask",
    delItemSchema,
    listsController.delTask
  );
  fastify.put(
    "/:idList/items/:idTask",
    changeItemSchema,
    listsController.changeItem
  );
}

export default lists;
