import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class books1595252853854 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'books',
      columns: [
        {
          name: 'id',
          type: 'serial',
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'character varying(255)',
          isNullable: true,
        },
        {
          name: 'author_id',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'page_count',
          type: 'smallint',
          isNullable: false,
        },
      ],
    }), true);

    await queryRunner.createForeignKey('books', new TableForeignKey({
      columnNames: ['author_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'authors',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books');
  }
}
