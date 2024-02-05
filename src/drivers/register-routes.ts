import { ApolloServer } from '@apollo/server'
import { AppServer } from './server'
import { registerGraphQlRoutes } from 'drivers/graphql/grapql.routes'
export async function registerRoutes(
  server: AppServer,
  apollo: ApolloServer,
): Promise<AppServer> {
  const graphqlRouteOptions = {
    prefix: '/ncms',
  }
  server.register(registerGraphQlRoutes(apollo), graphqlRouteOptions)
  
  return server
}
