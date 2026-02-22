/*
  Warnings:

  - You are about to drop the column `created_at` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users_status` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `users_status` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `users_user_role_id_fkey` ON `users`;

-- DropIndex
DROP INDEX `users_user_status_id_fkey` ON `users`;

-- AlterTable
ALTER TABLE `user_roles` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `users_status` DROP COLUMN `created_at`,
    DROP COLUMN `update_at`;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_role_id_fkey` FOREIGN KEY (`user_role_id`) REFERENCES `user_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_status_id_fkey` FOREIGN KEY (`user_status_id`) REFERENCES `users_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
