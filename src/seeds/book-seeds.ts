import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Author } from '../entity/Author'
import { Book } from '../entity/Book'

export default class CreateBooks implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    console.log(factory);

    const authors = await connection
      .getRepository(Author)
      .createQueryBuilder("author")
      .getMany();

    for await (let author of authors) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Book)
        .values({
          pageCount: Math.floor(Math.random() * 500),
          name: `${author.name} text 1`,
          authorId: author.id
        })
        .execute();

      await connection
        .createQueryBuilder()
        .insert()
        .into(Book)
        .values({
          pageCount: Math.floor(Math.random() * 500),
          name: `${author.name} text 2`,
          authorId: author.id
        })
        .execute()
    }
  }
}