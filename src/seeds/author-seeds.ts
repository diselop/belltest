import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Author } from '../entity/Author'

export default class CreateAuthors implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    console.log(factory);
    const authors = [
      { name: 'Pushkin' },
      { name: 'Lermontov' },
      { name: 'Fet' },
      { name: 'Gogol' },
      { name: 'Tolstoy' },
    ];

    await connection
      .createQueryBuilder()
      .insert()
      .into(Author)
      .values(authors)
      .execute()

  }
}