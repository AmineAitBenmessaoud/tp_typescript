import { FastifyInstance } from "fastify";
import * as listsController from "../../controllers/lists.controller";

async function lists(fastify: FastifyInstance) {
  fastify.get("/", listsController.listLists);

  // TODO implement addList in controller
  fastify.post("/", listsController.addList);

  fastify.put("/:id", listsController.changeElem);
  fastify.delete("/:id/item/:id", listsController.delElem);
}

export default lists;
