import { MigrationInterface, QueryRunner } from "typeorm"

export class initial1619723437787 implements MigrationInterface {
  name = 'initial1619723437787'

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.connection.driver.options.type === 'sqlite') {
      await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar, "lastName" varchar, "email" varchar(255) NOT NULL, "username" varchar(255) NOT NULL, "passwordHash" varchar NOT NULL, "salt" varchar, "provider" varchar NOT NULL, "roles" text NOT NULL, "language" varchar NOT NULL, "resetPasswordToken" varchar, "resetPasswordExpires" datetime, "token" varchar, "apiKey" varchar, "created" datetime NOT NULL DEFAULT (datetime('now')), "lastModified" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
      await queryRunner.query(`CREATE TABLE "page" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "show" boolean NOT NULL, "title" varchar, "paragraph" text, "buttonText" varchar)`);
      await queryRunner.query(`CREATE TABLE "form_field_logic" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "formula" varchar NOT NULL, "action" varchar(10) NOT NULL, "visible" boolean, "require" boolean, "disable" boolean, "enabled" boolean NOT NULL, "fieldId" integer, "jumpToId" integer, CONSTRAINT "FK_6098b83f6759445d8cfdd03d545" FOREIGN KEY ("fieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4a8019f2b753cfb3216dc3001a6" FOREIGN KEY ("jumpToId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "form_field_option" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "key" varchar, "title" varchar, "value" varchar NOT NULL, "fieldId" integer, CONSTRAINT "FK_c4484ad12c2c56db31dffdbfe97" FOREIGN KEY ("fieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "form_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "slug" varchar, "required" boolean NOT NULL, "disabled" boolean NOT NULL, "type" varchar NOT NULL, "value" varchar NOT NULL, "formId" integer, "ratingSteps" integer, "ratingShape" varchar, CONSTRAINT "FK_2d83d8a334dd66445db13f92b77" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "form_hook" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "enabled" boolean NOT NULL, "url" varchar NOT NULL, "format" varchar, "formId" integer, CONSTRAINT "FK_bbeb4d224d8857fd5a458538a30" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "form_notification" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "subject" varchar, "htmlTemplate" varchar, "enabled" boolean NOT NULL, "toEmail" varchar, "fromEmail" varchar, "formId" integer, "fromFieldId" integer, "toFieldId" integer, CONSTRAINT "FK_a9ed55144108ded893b502d6321" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0876741ce2acdaee4553d7a3bbd" FOREIGN KEY ("fromFieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4915ebae53e09b732322d0ff6ed" FOREIGN KEY ("toFieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "submission_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fieldType" varchar NOT NULL, "fieldValue" varchar NOT NULL, "submissionId" integer, "fieldId" integer, CONSTRAINT "FK_16fae661ce5b10f27abe2e524a0" FOREIGN KEY ("submissionId") REFERENCES "submission" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_5befa92da2370b7eb1cab6ae30a" FOREIGN KEY ("fieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "form_visitor" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "referrer" varchar, "ipAddr" varchar NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), "formId" integer, "geoLocationCountry" varchar, "geoLocationCity" varchar, "deviceLanguage" varchar, "deviceType" varchar, "deviceName" varchar, CONSTRAINT "FK_72ade6c3a3e55d1fce94300f8b6" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "submission" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ipAddr" varchar NOT NULL, "tokenHash" varchar NOT NULL, "timeElapsed" integer NOT NULL, "percentageComplete" integer NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "lastModified" datetime NOT NULL DEFAULT (datetime('now')), "formId" integer, "visitorId" integer, "userId" integer, "geoLocationCountry" varchar, "geoLocationCity" varchar, "deviceLanguage" varchar, "deviceType" varchar, "deviceName" varchar, CONSTRAINT "FK_7bd626272858ef6464aa2579094" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_95b73c7faf2c199f005fda5e8c8" FOREIGN KEY ("visitorId") REFERENCES "form_visitor" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_6090e1d5cbf3433ffd14e3b53e7" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "page_button" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar, "action" varchar, "text" varchar NOT NULL, "bgColor" varchar, "activeColor" varchar, "color" varchar, "pageId" integer, CONSTRAINT "FK_d9f099286b75fa0034dcd8cf7c2" FOREIGN KEY ("pageId") REFERENCES "page" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "form" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "language" varchar(10) NOT NULL, "showFooter" boolean NOT NULL, "isLive" boolean NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "lastModified" datetime NOT NULL DEFAULT (datetime('now')), "adminId" integer, "startPageId" integer, "endPageId" integer, "analyticsGacode" varchar, "designFont" varchar, "designColorsBackground" varchar, "designColorsQuestion" varchar, "designColorsAnswer" varchar, "designColorsButton" varchar, "designColorsButtonactive" varchar, "designColorsButtontext" varchar, CONSTRAINT "FK_a7cb33580bca2b362e5e34fdfcd" FOREIGN KEY ("adminId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_023d9cf1d97e93facc96c86ca70" FOREIGN KEY ("startPageId") REFERENCES "page" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e5d158932e43cfbf9958931ee01" FOREIGN KEY ("endPageId") REFERENCES "page" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
    } else {
      await queryRunner.query(`CREATE TABLE "form_field_logic" ("id" SERIAL NOT NULL, "formula" character varying NOT NULL, "action" character varying(10) NOT NULL, "visible" boolean, "require" boolean, "disable" boolean, "enabled" boolean NOT NULL, "fieldId" integer, "jumpToId" integer, CONSTRAINT "PK_c40e7f583854ff1b60900d8cf1b" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "form_field_option" ("id" SERIAL NOT NULL, "key" character varying, "title" character varying, "value" character varying NOT NULL, "fieldId" integer, CONSTRAINT "PK_812955356e516819e37b64bf39b" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "form_field" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "slug" character varying, "required" boolean NOT NULL, "disabled" boolean NOT NULL, "type" character varying NOT NULL, "value" character varying NOT NULL, "formId" integer, "ratingSteps" integer, "ratingShape" character varying, CONSTRAINT "PK_135904ddb60085b07254ea4f485" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "form_hook" ("id" SERIAL NOT NULL, "enabled" boolean NOT NULL, "url" character varying NOT NULL, "format" character varying, "formId" integer, CONSTRAINT "PK_4b63bd9ff09f7b3e5c4a41fcbec" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "form_notification" ("id" SERIAL NOT NULL, "subject" character varying, "htmlTemplate" character varying, "enabled" boolean NOT NULL, "toEmail" character varying, "fromEmail" character varying, "formId" integer, "fromFieldId" integer, "toFieldId" integer, CONSTRAINT "PK_935306529aed07c9f6628f6e24f" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "submission_field" ("id" SERIAL NOT NULL, "fieldType" character varying NOT NULL, "fieldValue" character varying NOT NULL, "submissionId" integer, "fieldId" integer, CONSTRAINT "PK_5443f5f769fce3107982c16e0b5" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying, "email" character varying(255) NOT NULL, "username" character varying(255) NOT NULL, "passwordHash" character varying NOT NULL, "salt" character varying, "provider" character varying NOT NULL, "roles" character varying(10) NOT NULL, "language" character varying NOT NULL, "resetPasswordToken" character varying, "resetPasswordExpires" TIMESTAMP, "token" character varying, "apiKey" character varying, "created" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "form_visitor" ("id" SERIAL NOT NULL, "referrer" character varying, "ipAddr" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "formId" integer, "geoLocationCountry" character varying, "geoLocationCity" character varying, CONSTRAINT "PK_74224dc63e13cf5cb5f0420e65b" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "submission" ("id" SERIAL NOT NULL, "ipAddr" character varying NOT NULL, "tokenHash" character varying NOT NULL, "timeElapsed" integer NOT NULL, "percentageComplete" integer NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "formId" integer, "visitorId" integer, "userId" integer, "geoLocationCountry" character varying, "geoLocationCity" character varying, CONSTRAINT "PK_7faa571d0e4a7076e85890c9bd0" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "page_button" ("id" SERIAL NOT NULL, "url" character varying, "action" character varying, "text" character varying NOT NULL, "bgColor" character varying, "activeColor" character varying, "color" character varying, "pageId" integer, CONSTRAINT "PK_6609a75a7d82775aac8af1a591c" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "page" ("id" SERIAL NOT NULL, "show" boolean NOT NULL, "title" character varying, "paragraph" text, "buttonText" character varying, CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "form" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "language" character varying(10) NOT NULL, "showFooter" boolean NOT NULL, "isLive" boolean NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "adminId" integer, "startPageId" integer, "endPageId" integer, "analyticsGacode" character varying, "designFont" character varying, "designColorsBackground" character varying, "designColorsQuestion" character varying, "designColorsAnswer" character varying, "designColorsButton" character varying, "designColorsButtonactive" character varying, "designColorsButtontext" character varying, CONSTRAINT "PK_8f72b95aa2f8ba82cf95dc7579e" PRIMARY KEY ("id"))`);
      await queryRunner.query(`ALTER TABLE "form_field_logic" ADD CONSTRAINT "FK_6098b83f6759445d8cfdd03d545" FOREIGN KEY ("fieldId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_field_logic" ADD CONSTRAINT "FK_4a8019f2b753cfb3216dc3001a6" FOREIGN KEY ("jumpToId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_field_option" ADD CONSTRAINT "FK_c4484ad12c2c56db31dffdbfe97" FOREIGN KEY ("fieldId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_field" ADD CONSTRAINT "FK_2d83d8a334dd66445db13f92b77" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_hook" ADD CONSTRAINT "FK_bbeb4d224d8857fd5a458538a30" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_notification" ADD CONSTRAINT "FK_a9ed55144108ded893b502d6321" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_notification" ADD CONSTRAINT "FK_0876741ce2acdaee4553d7a3bbd" FOREIGN KEY ("fromFieldId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_notification" ADD CONSTRAINT "FK_4915ebae53e09b732322d0ff6ed" FOREIGN KEY ("toFieldId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "submission_field" ADD CONSTRAINT "FK_16fae661ce5b10f27abe2e524a0" FOREIGN KEY ("submissionId") REFERENCES "submission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "submission_field" ADD CONSTRAINT "FK_5befa92da2370b7eb1cab6ae30a" FOREIGN KEY ("fieldId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_visitor" ADD CONSTRAINT "FK_72ade6c3a3e55d1fce94300f8b6" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_6090e1d5cbf3433ffd14e3b53e7" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_95b73c7faf2c199f005fda5e8c8" FOREIGN KEY ("visitorId") REFERENCES "form_visitor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_7bd626272858ef6464aa2579094" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "page_button" ADD CONSTRAINT "FK_d9f099286b75fa0034dcd8cf7c2" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_a7cb33580bca2b362e5e34fdfcd" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_023d9cf1d97e93facc96c86ca70" FOREIGN KEY ("startPageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_e5d158932e43cfbf9958931ee01" FOREIGN KEY ("endPageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);


      await queryRunner.query(`ALTER TABLE "form_visitor" ADD "deviceLanguage" character varying`);
      await queryRunner.query(`ALTER TABLE "form_visitor" ADD "deviceType" character varying`);
      await queryRunner.query(`ALTER TABLE "form_visitor" ADD "deviceName" character varying`);
      await queryRunner.query(`ALTER TABLE "submission" ADD "deviceLanguage" character varying`);
      await queryRunner.query(`ALTER TABLE "submission" ADD "deviceType" character varying`);
      await queryRunner.query(`ALTER TABLE "submission" ADD "deviceName" character varying`);

      await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
      await queryRunner.query(`ALTER TABLE "user" ADD "roles" text NOT NULL`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.connection.driver.options.type !== 'sqlite') {
      await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_e5d158932e43cfbf9958931ee01"`);
      await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_023d9cf1d97e93facc96c86ca70"`);
      await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_a7cb33580bca2b362e5e34fdfcd"`);
      await queryRunner.query(`ALTER TABLE "page_button" DROP CONSTRAINT "FK_d9f099286b75fa0034dcd8cf7c2"`);
      await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_7bd626272858ef6464aa2579094"`);
      await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_95b73c7faf2c199f005fda5e8c8"`);
      await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_6090e1d5cbf3433ffd14e3b53e7"`);
      await queryRunner.query(`ALTER TABLE "form_visitor" DROP CONSTRAINT "FK_72ade6c3a3e55d1fce94300f8b6"`);
      await queryRunner.query(`ALTER TABLE "submission_field" DROP CONSTRAINT "FK_5befa92da2370b7eb1cab6ae30a"`);
      await queryRunner.query(`ALTER TABLE "submission_field" DROP CONSTRAINT "FK_16fae661ce5b10f27abe2e524a0"`);
      await queryRunner.query(`ALTER TABLE "form_notification" DROP CONSTRAINT "FK_4915ebae53e09b732322d0ff6ed"`);
      await queryRunner.query(`ALTER TABLE "form_notification" DROP CONSTRAINT "FK_0876741ce2acdaee4553d7a3bbd"`);
      await queryRunner.query(`ALTER TABLE "form_notification" DROP CONSTRAINT "FK_a9ed55144108ded893b502d6321"`);
      await queryRunner.query(`ALTER TABLE "form_hook" DROP CONSTRAINT "FK_bbeb4d224d8857fd5a458538a30"`);
      await queryRunner.query(`ALTER TABLE "form_field" DROP CONSTRAINT "FK_2d83d8a334dd66445db13f92b77"`);
      await queryRunner.query(`ALTER TABLE "form_field_option" DROP CONSTRAINT "FK_c4484ad12c2c56db31dffdbfe97"`);
      await queryRunner.query(`ALTER TABLE "form_field_logic" DROP CONSTRAINT "FK_4a8019f2b753cfb3216dc3001a6"`);
      await queryRunner.query(`ALTER TABLE "form_field_logic" DROP CONSTRAINT "FK_6098b83f6759445d8cfdd03d545"`);
    }

    await queryRunner.query(`DROP TABLE "form"`);
    await queryRunner.query(`DROP TABLE "page"`);
    await queryRunner.query(`DROP TABLE "page_button"`);
    await queryRunner.query(`DROP TABLE "submission"`);
    await queryRunner.query(`DROP TABLE "form_visitor"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "submission_field"`);
    await queryRunner.query(`DROP TABLE "form_notification"`);
    await queryRunner.query(`DROP TABLE "form_hook"`);
    await queryRunner.query(`DROP TABLE "form_field"`);
    await queryRunner.query(`DROP TABLE "form_field_option"`);
    await queryRunner.query(`DROP TABLE "form_field_logic"`);
  }
}
