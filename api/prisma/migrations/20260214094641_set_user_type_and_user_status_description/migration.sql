/*
  Warnings:

  - Added the required column `description` to the `user_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descreption` to the `users_status` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_user_status_id_fkey` ON `users`;

-- DropIndex
DROP INDEX `users_user_type_id_fkey` ON `users`;

-- AlterTable
ALTER TABLE `user_types` ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users_status` ADD COLUMN `descreption` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_type_id_fkey` FOREIGN KEY (`user_type_id`) REFERENCES `user_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_status_id_fkey` FOREIGN KEY (`user_status_id`) REFERENCES `users_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
