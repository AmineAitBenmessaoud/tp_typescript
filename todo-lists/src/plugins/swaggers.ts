import fp from "fastify-plugin";
import swagger, { FastifySwaggerOptions } from "@fastify/swagger";

import JsonSchemas from "../schemas/all.json";

export default fp<FastifySwaggerOptions>(async (fastify) => {
  fastify.addSchema({
    $id: "ITodoList",
    ...JsonSchemas.definitions.ITodoList,
  });
  fastify.addSchema({
    $id: "Task",
    ...JsonSchemas.definitions.Task,
  });

  fastify.register(swagger, {
    openapi: {
      info: { title: "Todo API", version: "1.0.0" },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
      ],
    },
  });
  // fastify.addSchema({
  //   $id: 'ITodoList',
  //   type: 'object',
  //   properties: JsonSchemas.definitions.ITodoList
  // })
  // fastify.addSchema({
  //   type: 'object',
  //   properties: JsonSchemas.definitions.ITodoItem
  // })
});


