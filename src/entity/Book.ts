import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity({ name: 'books' })
export class Book extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({
      length: 255,
    })
    name: string;

    @Field(() => Int)
    @Column({
      name: 'page_count',
    })
    pageCount: number;

    @Field(() => Int)
    @Column({
      name: 'author_id',
    })
    authorId: number;
}
