import { FastifyRequest, FastifyReply } from 'fastify'
export const authenticationMiddleWare = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  console.log('vishnu123', req.headers.authorization)
}
