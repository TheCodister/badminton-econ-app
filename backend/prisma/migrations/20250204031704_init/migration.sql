/*
  Warnings:

  - The primary key for the `rackets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `rackets` table. All the data in the column will be lost.
  - The primary key for the `shoes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `shoes` table. All the data in the column will be lost.
  - The primary key for the `shuttlecocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `shuttlecocks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rackets" DROP CONSTRAINT "rackets_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "rackets_pkey" PRIMARY KEY ("product_id");

-- AlterTable
ALTER TABLE "shoes" DROP CONSTRAINT "shoes_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "shoes_pkey" PRIMARY KEY ("product_id");

-- AlterTable
ALTER TABLE "shuttlecocks" DROP CONSTRAINT "shuttlecocks_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "shuttlecocks_pkey" PRIMARY KEY ("product_id");
