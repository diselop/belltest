import { Connection } from 'typeorm';

import { createTestConn } from './createTestConn';
import { Book } from './entity/Book';
import { Author } from './entity/Author';

import { graphqlTestCall } from './graphqlTestCall';


const createAuthorMutation = `
  mutation{
    createAuthor(name: "Pushkin")
  }
`;

const onlyBookQuery = `
{
  books{
    id, pageCount,name,authorId
  }
}
`;

const bookWithAuthorsQuery = `
{
  books{
    id,name,pageCount,authorId,
    author{name}
  }
}
`;

let conn: Connection;

beforeAll(async () => {
  conn = await createTestConn();
});

afterAll(async () => {
  await conn.close();
});

describe('resolvers', () => {
  it('test all case', async () => {
    let authorResponse = await graphqlTestCall(createAuthorMutation);

    authorResponse = JSON.parse(JSON.stringify(authorResponse));

    expect(authorResponse).toEqual({ data: { createAuthor: true } });

    const dbAuthor = await Author.findOne({ where: { name: 'Pushkin' } });

    expect(dbAuthor).toBeDefined();

    const createBookMutation = `
        mutation{
          createBook(name: "Test", pageCount:400, authorId:${dbAuthor!.id})
        }
      `;

    let bookMutation = await graphqlTestCall(createBookMutation);

    bookMutation = JSON.parse(JSON.stringify(bookMutation));

    expect(bookMutation).toEqual({ data: { createBook: true } });

    const dbBook = await Book.findOne({ where: { name: 'Test', pageCount: 400, authorId: dbAuthor!.id } });

    expect(dbBook).toBeDefined();

    let bookQuery = await graphqlTestCall(onlyBookQuery);
    bookQuery = JSON.parse(JSON.stringify(bookQuery));

    expect(bookQuery?.data?.books[0]).toBeDefined();

    expect(bookQuery?.data?.books[0]).toEqual({
          id: dbBook!.id,
          pageCount: dbBook!.pageCount,
          name: dbBook!.name,
          authorId: dbAuthor!.id,
    });

    let bookWithAuthorsResponse = await graphqlTestCall(bookWithAuthorsQuery);
    bookWithAuthorsResponse = JSON.parse(JSON.stringify(bookWithAuthorsResponse));

    expect(bookWithAuthorsResponse?.data?.books[0]).toBeDefined();

    expect(bookWithAuthorsResponse?.data?.books[0]).toEqual({
          id: dbBook!.id,
          pageCount: dbBook!.pageCount,
          name: dbBook!.name,
          authorId: dbAuthor!.id,
          author:{
            name: dbAuthor!.name
          }
    });
  });
});