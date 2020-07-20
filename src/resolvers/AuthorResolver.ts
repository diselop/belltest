import { getRepository } from 'typeorm';
import {
  Arg, Resolver, Mutation, Query,
  FieldResolver, Root,
} from 'type-graphql';
import { Author } from '../entity/Author';
import { Book } from '../entity/Book';

@Resolver(() => Author)
export class AuthorResolver {
  @FieldResolver(() => [Book])
  async books(@Root() author: Author) {
    const books = await getRepository(Book).find({ where: { authorId: author.id } });

    return books;
  }

  @Mutation(() => Boolean)
  async createAuthor(
    @Arg('name', () => String) name: string,
  ) {
    await Author.insert({ name });

    return true;
  }

  @Query(() => [Author])
  authors() {
    return Author.find();
  }
}
