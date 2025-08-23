-- AlterTable
ALTER TABLE "public"."RecurringTransaction" ALTER COLUMN "frequency" DROP NOT NULL,
ALTER COLUMN "roi" DROP NOT NULL;
