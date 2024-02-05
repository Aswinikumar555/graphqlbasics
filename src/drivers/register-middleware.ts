import { AppServer } from './server'
import { FastifyRequest, FastifyReply } from 'fastify'
import { authenticationMiddleWare } from './middlewares/authentication.middleware'
import { authorizationMiddleWare } from './middlewares/authorization.middileware'
export async function registerMiddleware(
  server: AppServer,
): Promise<AppServer> {
  server.addHook(
    'onRequest',
    async (req: FastifyRequest, reply: FastifyReply) => {
      await authenticationMiddleWare(req, reply)
      await authorizationMiddleWare(req, reply)
    },
  )

  return server
}
