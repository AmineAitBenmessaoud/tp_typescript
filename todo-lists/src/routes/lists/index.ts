import { FastifyInstance } from 'fastify'
import * as listsController from '../../controllers/lists.controller'
//hell
async function lists(fastify: FastifyInstance) {

  fastify.get('/', listsController.listLists)

  // TODO implement addList in controller
  fastify.post('/', listsController.addList)

}

export default lists