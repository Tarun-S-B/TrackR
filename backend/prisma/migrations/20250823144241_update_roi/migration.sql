/*
  Warnings:

  - Added the required column `roi` to the `RecurringTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."RecurringTransaction" ADD COLUMN     "roi" DECIMAL(5,2) NOT NULL;
