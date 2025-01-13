import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736776032537 implements MigrationInterface {
    name = 'Migration1736776032537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_register" ALTER COLUMN "roleName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_register" ALTER COLUMN "roleName" SET NOT NULL`);
    }

}
