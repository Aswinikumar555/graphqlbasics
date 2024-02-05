import { DataSource } from 'typeorm'
import { UserRepository } from 'infra/postgres/user/user.repository'
import { User } from 'entities/user.entity'

export const getUserResolver = async (connection: DataSource) => {
  const repository = new UserRepository(connection)
  const resolvers = {
    Query: {
      users: async () => {
        return await repository.getData()
      },
    },
    Mutation: {
      createUser: async (_: any, { name, email }: any,context : any) => {
        const {request}  = context;
        

        const user: Partial<User> = {
          name: name,
          email: email,
        }
        const userObject = new User(user)
        return await repository.save(userObject)
      },
    },
  }

  return resolvers
}
