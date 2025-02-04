-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('LINING', 'YONEX', 'VICTOR', 'MIZUNO', 'VS', 'KUMPOO', 'APACS', 'PROACE', 'FLEET', 'FLYPOWER', 'RESON');

-- CreateTable
CREATE TABLE "branches" (
    "branch_id" VARCHAR(100) NOT NULL,
    "branch_name" VARCHAR(100) NOT NULL,
    "branch_address" TEXT NOT NULL,
    "branch_phone" VARCHAR(15) NOT NULL,

    CONSTRAINT "branches_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "admins" (
    "user_id" TEXT NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "mail" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(15) NOT NULL,
    "password" TEXT NOT NULL,
    "branch_id" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "customers" (
    "user_id" TEXT NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "mail" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(15) NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "shopping_carts" (
    "cart_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "shopping_carts_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "cart_items" (
    "item_id" TEXT NOT NULL,
    "cart_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" TEXT NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "customer_id" TEXT NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "item_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "brand" "Brand" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sales" BOOLEAN NOT NULL DEFAULT false,
    "stock" INTEGER NOT NULL,
    "available_location" JSONB NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rackets" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "line" TEXT NOT NULL,
    "stiffness" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "max_tension" TEXT NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "technology" JSONB NOT NULL,

    CONSTRAINT "rackets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shoes" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "color" JSONB NOT NULL,
    "size" JSONB NOT NULL,
    "available_size" JSONB NOT NULL,
    "technology" JSONB NOT NULL,

    CONSTRAINT "shoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shuttlecocks" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "shuttle_type" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "no_per_tube" INTEGER NOT NULL,

    CONSTRAINT "shuttlecocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_mail_key" ON "admins"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "customers_mail_key" ON "customers"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "shopping_carts_customer_id_key" ON "shopping_carts"("customer_id");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "shopping_carts"("cart_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rackets" ADD CONSTRAINT "rackets_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shoes" ADD CONSTRAINT "shoes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shuttlecocks" ADD CONSTRAINT "shuttlecocks_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
