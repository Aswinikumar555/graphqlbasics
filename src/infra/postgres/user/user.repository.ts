import { DataSource } from 'typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

export class UserRepository {
  private repository: Repository<User>

  constructor(connection: DataSource) {
    this.repository = connection.getRepository(User)
  }

  public async save(user: User): Promise<User> {
    const newUser = await this.repository.save(user)
    return newUser
  }
  public async getData(): Promise<User[] | null> {
    const query = await this.repository.createQueryBuilder('user').getMany()
    return query
  }
}
