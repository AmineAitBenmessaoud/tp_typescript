export const listListsSchema = {
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
              $ref: "ITodoList#",
            },
          },
        },
      },
    },
  },
};

export const addListSchema = {
  schema: {
    description: "Add a new TODO list",
    tags: ["lists"],
    body: {
      $ref: "ITodoList#",
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
};

export const putListSchema = {
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
            body: {
              $ref: "ITodoList#",
            },
          },
        },
      },
    },
  },
};

export const postItemSchema = {
  schema: {
    description: "Add a task to an existing TODO list",
    tags: ["lists/items"],
    params: {
      type: "object",
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
    body: {
      $ref: "Task#",
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
};

export const delItemSchema = {
  schema: {
    description: "Delete a task from a TODO list",
    tags: ["lists/items"],
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
};

export const changeItemSchema = {
  schema: {
    description: "Update a task in an existing TODO list",
    tags: ["lists/items"],
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
    },
    response: {
      200: {
        description: "Successfully updated the task",
        type: "object",
        properties: {
          data: {
            type: "object",
          },
        },
      },
    },
  },
};
