/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `user_roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[status]` on the table `users_status` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `users_user_role_id_fkey` ON `users`;

-- DropIndex
DROP INDEX `users_user_status_id_fkey` ON `users`;

-- CreateIndex
CREATE UNIQUE INDEX `user_roles_role_key` ON `user_roles`(`role`);

-- CreateIndex
CREATE UNIQUE INDEX `users_status_status_key` ON `users_status`(`status`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_role_id_fkey` FOREIGN KEY (`user_role_id`) REFERENCES `user_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_status_id_fkey` FOREIGN KEY (`user_status_id`) REFERENCES `users_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
