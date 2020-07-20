import { getRepository } from 'typeorm';
import {
  Arg, Resolver, Mutation, Query,
  FieldResolver, Root,
} from 'type-graphql';
import { Book } from '../entity/Book';
import { Author } from '../entity/Author';

@Resolver(() => Book)
export class BookResolver {
  @FieldResolver(() => Author)
  async author(@Root() book: Book) {
    const author = await getRepository(Author).findOne(book.authorId);

    return author;
  }

  @Mutation(() => Boolean)
  async createBook(
    @Arg('name', () => String) name: string,
    @Arg('pageCount', () => Number) pageCount: number,
    @Arg('authorId', () => Number) authorId: number,
  ) {
    await Book.insert({ name, pageCount, authorId });
    return true;
  }

  @Query(() => [Book])
  books() {
    return Book.find();
  }
}
