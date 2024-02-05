import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { DataSource } from 'typeorm'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { ApolloServer, BaseContext } from '@apollo/server'
import fastifyApollo, {
  fastifyApolloDrainPlugin,
  ApolloFastifyHandlerOptions,
} from '@as-integrations/fastify'

import { pgConnection } from 'connections/postgres.connection'
import { ILogger, makeLogger } from 'cross-cutting/logger'
import { registerRoutes } from './register-routes'
import { typeDefs } from 'combiners/typedefs.combiner'
import { getResolvers } from 'combiners/resolvers.combiner'
import { registerMiddleware } from './register-middleware'

export type Request = IncomingMessage
export type Response = ServerResponse
export type AppServer = FastifyInstance<Server, Request, Response>

export const createAppolloServer = async (
  server: AppServer,
  connection: DataSource,
) => {
  const resolvers = await getResolvers(connection)
  const apollo = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(server)],
  })
  await apollo.start()
  return apollo
}

export const createServer = async (appLogger: ILogger) => {
  const logger = appLogger
  const server: AppServer = fastify({ logger, ignoreTrailingSlash: true })
  const pgConnect = pgConnection()
  await pgConnect.initialize()
  const apollo = await createAppolloServer(server, pgConnect)
  await server.register(fastifyApollo(apollo))
  await registerRoutes(server, apollo)
  await registerMiddleware(server)
  return server
}

export const startServer = async (server: AppServer, logger: ILogger) => {
  await server.ready()
  const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000
  await server.listen({ port: port, host: '0.0.0.0' })
  console.log('server running on', process.env.NODE_ENV)
}

const start = () => {
  const logger = makeLogger()
  createServer(logger)
    .then((server) => {
      startServer(server, logger)
    })
    .catch((error) => {
      console.log('failed to start the server:', error)
    })
}

start()
