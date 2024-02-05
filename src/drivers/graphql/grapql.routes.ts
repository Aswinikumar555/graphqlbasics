import { RegisterOptions } from 'fastify'
import { ApolloServer } from '@apollo/server'
import { fastifyApolloHandler } from '@as-integrations/fastify'
import { AppServer } from 'drivers/server'


export function registerGraphQlRoutes(apollo: ApolloServer) {
  return (
    server: AppServer,
    routeOptions: RegisterOptions = {},
    done: () => void,
  ): void => {
    server.route({
      method: 'POST',
      url: '/super-api',
      handler: fastifyApolloHandler(apollo),
      ...routeOptions,
    })
    done()
  }
}
