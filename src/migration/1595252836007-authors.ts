import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class authors1595252836007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'authors',
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
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('authors');
  }
}
