/*
  Warnings:

  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "shopping_carts" DROP CONSTRAINT "shopping_carts_customer_id_fkey";

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "customers";

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "mail" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(12) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "address" TEXT,
    "branch_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_mail_key" ON "users"("mail");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
