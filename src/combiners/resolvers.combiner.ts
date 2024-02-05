import { DataSource } from 'typeorm'
import { getUserResolver } from 'resolvers/user.resolver'
import { getPostResolver } from 'resolvers/post.resolver'
export const getResolvers = async (connection: DataSource) => {
  const userResolver = await getUserResolver(connection)
  const postResolver = await getPostResolver(connection)
  const resolvers = [userResolver, postResolver]
  return resolvers
}
