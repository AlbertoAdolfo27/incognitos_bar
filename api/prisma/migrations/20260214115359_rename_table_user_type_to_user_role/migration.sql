/*
  Warnings:

  - You are about to drop the column `user_type_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `user_types` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_role_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_user_status_id_fkey` ON `users`;

-- DropIndex
DROP INDEX `users_user_type_id_fkey` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `user_type_id`,
    ADD COLUMN `delectedAt` DATETIME(3) NULL,
    ADD COLUMN `user_role_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `user_types`;

-- CreateTable
CREATE TABLE `user_roles` (
    `id` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_role_id_fkey` FOREIGN KEY (`user_role_id`) REFERENCES `user_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_status_id_fkey` FOREIGN KEY (`user_status_id`) REFERENCES `users_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
