import { DataSource } from 'typeorm'
import { Repository } from 'typeorm'
import { Post } from './post.entity'

export class PostRepository {
  private repository: Repository<Post>

  constructor(connection: DataSource) {
    this.repository = connection.getRepository(Post)
  }

  public async save(post: Post): Promise<Post> {
    const newUser = await this.repository.save(post)
    return newUser
  }
  public async getData(): Promise<Post[] | null> {
    const query = await this.repository.createQueryBuilder('post').getMany()
    return query
  }
}
