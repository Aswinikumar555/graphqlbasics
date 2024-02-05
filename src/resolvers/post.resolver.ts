import { DataSource } from 'typeorm'
import { PostRepository } from 'infra/postgres/post/post.repository'
import { Post } from 'entities/post.entity'

export const getPostResolver = async (connection: DataSource) => {
  const repository = new PostRepository(connection)
  const resolvers = {
    Query: {
      posts: async () => {
        return await repository.getData()
      },
    },
    Mutation: {
      createPosts: async (_: any, { title, content, author }: any) => {
        const post : Partial<Post> = {
          title: title,
          content: content,
          author: author,
        }
        const postObject = new Post(post)
        return await repository.save(postObject)
      },
    },
  }

  return resolvers
}
