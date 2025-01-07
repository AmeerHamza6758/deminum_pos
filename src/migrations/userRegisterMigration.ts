import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRegisterMigration1647430923178 implements MigrationInterface {
  name = 'UserRegisterMigration1647430923178';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_register_schema" (
        "id" SERIAL NOT NULL,
        "prefix" character varying,
        "fname" character varying NOT NULL,
        "lname" character varying NOT NULL,
        "email" character varying NOT NULL,
        "profileImage" character varying,
        "password" character varying NOT NULL,
        "language" character varying,
        "dob" TIMESTAMP,
        "gender" character varying,
        "martialStatus" character varying,
        "bloodGroup" character varying,
        "contactNo" character varying,
        "alterContactNO" character varying,
        "familyContactNO" character varying,
        "facebook" character varying,
        "twitter" character varying,
        "socialMedia1" character varying,
        "socialMedia2" character varying,
        "customField1" character varying,
        "customField2" character varying,
        "customField3" character varying,
        "customField4" character varying,
        "guardianName" character varying,
        "idProofName1" character varying,
        "idProofName2" character varying,
        "permanentAddress" character varying,
        "currentAddress" character varying,
        "accountHolderName" character varying,
        "accountNumber" character varying,
        "bankName" character varying,
        "branchName" character varying,
        "texPayerId" character varying,
        "bankIdentifierCode" character varying,
        "roleName" character varying NOT NULL DEFAULT 'user',
        CONSTRAINT "PK_user_register_schema" PRIMARY KEY ("id")
      )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "user_register_schema"');
  }
}
