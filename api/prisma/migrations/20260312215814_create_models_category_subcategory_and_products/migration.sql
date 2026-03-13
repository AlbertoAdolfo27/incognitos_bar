-- DropIndex
DROP INDEX `users_user_role_id_fkey` ON `users`;

-- DropIndex
DROP INDEX `users_user_status_id_fkey` ON `users`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `createdById` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unit_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `productId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_sub_categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `productId` VARCHAR(191) NOT NULL,
    `subCategoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unit` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_categories` ADD CONSTRAINT `product_categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_categories` ADD CONSTRAINT `product_categories_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_sub_categories` ADD CONSTRAINT `product_sub_categories_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `sub_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_sub_categories` ADD CONSTRAINT `product_sub_categories_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_role_id_fkey` FOREIGN KEY (`user_role_id`) REFERENCES `user_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_status_id_fkey` FOREIGN KEY (`user_status_id`) REFERENCES `users_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
