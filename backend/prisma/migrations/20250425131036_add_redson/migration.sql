/*
  Warnings:

  - The values [RESON] on the enum `Brand` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Brand_new" AS ENUM ('LINING', 'YONEX', 'VICTOR', 'MIZUNO', 'VS', 'KUMPOO', 'APACS', 'PROACE', 'FLEET', 'FLYPOWER', 'REDSON', 'TARO', 'FELET', 'VNB', 'PROKENNEX', 'KAWASAKI', 'GOSEN', 'IXE', 'KAMITO');
ALTER TABLE "products" ALTER COLUMN "brand" TYPE "Brand_new" USING ("brand"::text::"Brand_new");
ALTER TYPE "Brand" RENAME TO "Brand_old";
ALTER TYPE "Brand_new" RENAME TO "Brand";
DROP TYPE "Brand_old";
COMMIT;
