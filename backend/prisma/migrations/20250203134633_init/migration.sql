/*
  Warnings:

  - You are about to alter the column `total_price` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - Changed the type of `status` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'OUT_OF_STOCK');

-- DropForeignKey
ALTER TABLE "shopping_carts" DROP CONSTRAINT "shopping_carts_customer_id_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "total_price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "products" DROP COLUMN "status",
ADD COLUMN     "status" "ProductStatus" NOT NULL;

-- CreateIndex
CREATE INDEX "orders_customer_id_idx" ON "orders"("customer_id");

-- AddForeignKey
ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
