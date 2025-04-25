-- AlterTable
ALTER TABLE "products" ADD COLUMN     "number_of_sales" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "rackets" ADD COLUMN     "playing_style" TEXT NOT NULL DEFAULT 'all-rounder';
