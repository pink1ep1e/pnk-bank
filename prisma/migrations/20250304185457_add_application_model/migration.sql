/*
  Warnings:

  - Added the required column `commission` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "APPLICATION_STATUS" AS ENUM ('WAITING', 'REJECTED', 'ACTIVE');

-- CreateEnum
CREATE TYPE "NOTIFICATION_TYPE" AS ENUM ('ADMIN', 'SYSTEM', 'PASSWORD', 'CODEWORD', 'INFO');

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "commission" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isGov" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "sender" TEXT NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NOTIFICATION_TYPE" NOT NULL DEFAULT 'SYSTEM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "discrod" TEXT NOT NULL,
    "STATUS" "APPLICATION_STATUS" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
