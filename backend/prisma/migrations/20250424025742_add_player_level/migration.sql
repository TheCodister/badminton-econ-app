/*
  Warnings:

  - The `stiffness` column on the `rackets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `balance` column on the `rackets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Stiffness" AS ENUM ('Medium', 'Stiff', 'ExtraStiff', 'Flexible', 'ExtraFlexible');

-- CreateEnum
CREATE TYPE "Balance" AS ENUM ('EvenBalance', 'HeadHeavy', 'HeadLight');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Brand" ADD VALUE 'TARO';
ALTER TYPE "Brand" ADD VALUE 'FELET';
ALTER TYPE "Brand" ADD VALUE 'VNB';
ALTER TYPE "Brand" ADD VALUE 'PROKENNEX';
ALTER TYPE "Brand" ADD VALUE 'KAWASAKI';
ALTER TYPE "Brand" ADD VALUE 'GOSEN';
ALTER TYPE "Brand" ADD VALUE 'IXE';
ALTER TYPE "Brand" ADD VALUE 'KAMITO';

-- AlterTable
ALTER TABLE "rackets" DROP COLUMN "stiffness",
ADD COLUMN     "stiffness" "Stiffness" NOT NULL DEFAULT 'Medium',
DROP COLUMN "balance",
ADD COLUMN     "balance" "Balance" NOT NULL DEFAULT 'EvenBalance';
