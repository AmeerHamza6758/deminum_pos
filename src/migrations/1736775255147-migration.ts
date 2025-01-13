import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736775255147 implements MigrationInterface {
    name = 'Migration1736775255147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business_register_schema" ("id" SERIAL NOT NULL, "bussinessName" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "currency" character varying NOT NULL, "logo" character varying, "website" character varying, "bussinessContactNumber" character varying NOT NULL, "alterContactNumber" character varying, "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" integer NOT NULL, "landMark" character varying, "timeZone" character varying NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3d6fb9605bcd6c020b1c725dadb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_register" ("id" SERIAL NOT NULL, "prefix" character varying, "fname" character varying NOT NULL, "lname" character varying NOT NULL, "username" character varying, "email" character varying NOT NULL, "profileImage" character varying DEFAULT '', "password" character varying NOT NULL, "language" character varying, "dob" character varying, "gender" character varying, "martialStatus" character varying, "bloodGroup" character varying, "contactNo" character varying, "alterContactNO" character varying, "familyContactNO" character varying, "facebook" character varying, "twitter" character varying, "socialMedia1" character varying, "socialMedia2" character varying, "customField1" character varying, "customField2" character varying, "customField3" character varying, "customField4" character varying, "guardianName" character varying, "idProofName1" character varying, "idProofName2" character varying, "permanentAddress" character varying, "currentAddress" character varying, "accountHolderName" character varying, "accountNumber" character varying, "bankName" character varying, "branchName" character varying, "texPayerId" character varying, "bankIdentifierCode" character varying, "roleName" character varying NOT NULL DEFAULT 'user', "uid" character varying, "provider" character varying, "stripeCustomerId" character varying, "isVerified" boolean DEFAULT false, CONSTRAINT "UQ_a5576b3d3dde2b6edea1f4e0c1a" UNIQUE ("email"), CONSTRAINT "PK_c8ea2be65a861d2916735d4f877" PRIMARY KEY ("id")); COMMENT ON COLUMN "user_register"."texPayerId" IS 'Taxpayer ID of the user'`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "otp" character varying NOT NULL, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "business_register_schema" ADD CONSTRAINT "FK_bbd8aa2075cd3dd0f4ff189e4e6" FOREIGN KEY ("userId") REFERENCES "user_register"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "business_register_schema" DROP CONSTRAINT "FK_bbd8aa2075cd3dd0f4ff189e4e6"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`DROP TABLE "user_register"`);
        await queryRunner.query(`DROP TABLE "business_register_schema"`);
    }

}
