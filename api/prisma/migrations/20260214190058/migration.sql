/*
  Warnings:

  - You are about to drop the column `role` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `descreption` on the `users_status` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `users_status` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `user_roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `users_status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `users_status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users_status` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `user_roles_role_key` ON `user_roles`;

-- DropIndex
DROP INDEX `users_user_role_id_fkey` ON `users`;

-- DropIndex
DROP INDEX `users_user_status_id_fkey` ON `users`;

-- DropIndex
DROP INDEX `users_status_status_key` ON `users_status`;

-- AlterTable
ALTER TABLE `user_roles` DROP COLUMN `role`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users_status` DROP COLUMN `descreption`,
    DROP COLUMN `status`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_roles_name_key` ON `user_roles`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `users_status_name_key` ON `users_status`(`name`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_role_id_fkey` FOREIGN KEY (`user_role_id`) REFERENCES `user_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_status_id_fkey` FOREIGN KEY (`user_status_id`) REFERENCES `users_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
