/*
  Warnings:

  - You are about to drop the column `paypalEmail` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "paypalEmail",
ADD COLUMN     "paypalId" TEXT,
ADD COLUMN     "refreshToken" TEXT;
