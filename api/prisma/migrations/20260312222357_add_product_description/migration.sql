-- DropIndex
DROP INDEX `product_categories_categoryId_fkey` ON `product_categories`;

-- DropIndex
DROP INDEX `product_categories_productId_fkey` ON `product_categories`;

-- DropIndex
DROP INDEX `product_sub_categories_productId_fkey` ON `product_sub_categories`;

-- DropIndex
DROP INDEX `product_sub_categories_subCategoryId_fkey` ON `product_sub_categories`;

-- DropIndex
DROP INDEX `products_createdBy_fkey` ON `products`;

-- DropIndex
DROP INDEX `products_unit_id_fkey` ON `products`;

-- DropIndex
DROP INDEX `users_createdById_fkey` ON `users`;

-- DropIndex
DROP INDEX `users_user_role_id_fkey` ON `users`;

-- DropIndex
DROP INDEX `users_user_status_id_fkey` ON `users`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `description` VARCHAR(191) NULL,
    MODIFY `quantity` INTEGER NOT NULL DEFAULT 0;

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
