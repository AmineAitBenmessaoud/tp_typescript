import { FastifyInstance } from "fastify";
import * as listsController from "../../controllers/lists.controller";

async function lists(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      schema: {
        description: "This route returns the list of TO DO lists",
        tags: ["get"],
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    description: { type: "string" },
                    task: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          name: { type: "string" },
                          description: { type: "string" },
                          importance: { type: "number" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    listsController.listLists
  );

  // TODO implement addList in controller
  fastify.post(
    "/",
    {
      schema: {
        description: "Add a new TODO list",
        tags: ["lists"],
        body: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            description: { type: "string" },
            task: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                  description: { type: "string" },
                  importance: { type: "number" },
                },
                required: ["id", "name", "description", "importance"],
              },
            },
          },
          required: ["id", "name", "description", "task"],
        },
        response: {
          200: {
            description: "Successfully added the TODO list",
            type: "object",
            properties: {
              data: {
                type: "object",
              },
            },
          },
        },
      },
    },
    listsController.addList
  );

  fastify.put(
    "/:id",
    {
      schema: {
        description: "Update an existing TODO list element",
        tags: ["lists"],
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
        body: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            description: { type: "string" },
            task: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                  description: { type: "string" },
                  importance: { type: "number" },
                },
              },
            },
          },
        },
        response: {
          200: {
            description: "Successfully updated the TODO list",
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                  description: { type: "string" },
                  task: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        name: { type: "string" },
                        description: { type: "string" },
                        importance: { type: "number" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    listsController.changeElem
  );

  fastify.post(
    "/:id/items",
    {
      schema: {
        description: "Add a task to an existing TODO list",
        tags: ["items"],
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
        body: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            description: { type: "string" },
            importance: { type: "number" },
          },
          required: ["id", "name", "description", "importance"],
        },
        response: {
          200: {
            description: "Successfully added the task",
            type: "object",
            properties: {
              data: {
                type: "object",
              },
            },
          },
        },
      },
    },
    listsController.addItem
  );

  fastify.delete(
    "/:idList/items/:idTask",
    {
      schema: {
        description: "Delete a task from a TODO list",
        tags: ["items"],
        params: {
          type: "object",
          properties: {
            idList: { type: "number" },
            idTask: { type: "number" },
          },
          required: ["idList", "idTask"],
        },
        response: {
          200: {
            description: "Successfully deleted the task",
            type: "object",
            properties: {
              data: {
                type: "object",
              },
            },
          },
        },
      },
    },
    listsController.delTask
  );
  fastify.put(
    "/:idList/items/:idTask",
    {
      schema: {
        description: "Update a task in an existing TODO list",
        tags: ["items"],
        params: {
          type: "object",
          properties: {
            idList: { type: "number" },
            idTask: { type: "number" },
          },
          required: ["idList", "idTask"],
        },
        body: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            description: { type: "string" },
            importance: { type: "number" },
          },
          required: [], // Optional fields
        },
        response: {
          200: {
            description: "Successfully updated the task",
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: {
                  id: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    listsController.changeItem
  );
}

export default lists;
