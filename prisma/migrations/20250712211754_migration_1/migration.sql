/*
  Warnings:

  - You are about to drop the column `discrod` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `premium` on the `User` table. All the data in the column will be lost.
  - Added the required column `discord` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OPERATION_TYPE" AS ENUM ('REPLENISHMENT', 'WITHDRAWAL');

-- CreateEnum
CREATE TYPE "OPERATION_METHOD" AS ENUM ('MEET', 'CHEST');

-- CreateEnum
CREATE TYPE "REPLENISH_STATUS" AS ENUM ('REJECTED', 'PENDING', 'WAITING', 'SUCCESS');

-- CreateEnum
CREATE TYPE "TRANSACTION_TYPE" AS ENUM ('TRANSFER', 'PAYMENT', 'GOVERNMENT', 'BANK');

-- CreateEnum
CREATE TYPE "PAYMENT_STATUS" AS ENUM ('FAILED', 'PENDING', 'SUCCESS');

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "discrod",
ADD COLUMN     "discord" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "type" "TRANSACTION_TYPE" NOT NULL DEFAULT 'TRANSFER';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "premium",
ADD COLUMN     "lvl" INTEGER DEFAULT 1,
ADD COLUMN     "xp" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "Premium" (
    "id" SERIAL NOT NULL,
    "prefix" TEXT NOT NULL DEFAULT 'Premium',
    "beginning" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ending" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Premium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lvl" INTEGER NOT NULL,
    "xp" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "paymentId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "recipient" TEXT NOT NULL,
    "shopUrl" TEXT NOT NULL,
    "sender" TEXT,
    "description" TEXT NOT NULL,
    "status" "PAYMENT_STATUS" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "admin" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Replenish" (
    "id" SERIAL NOT NULL,
    "recipient" TEXT NOT NULL,
    "courier" TEXT,
    "operationType" "OPERATION_TYPE" NOT NULL DEFAULT 'REPLENISHMENT',
    "operationMethod" "OPERATION_METHOD" NOT NULL DEFAULT 'CHEST',
    "coordinates" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "сomment" TEXT,
    "runTime" INTEGER,
    "waitingTime" INTEGER,
    "status" "REPLENISH_STATUS" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Replenish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courier" (
    "id" SERIAL NOT NULL,
    "courierName" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Courier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentId_key" ON "Payment"("paymentId");

-- AddForeignKey
ALTER TABLE "Premium" ADD CONSTRAINT "Premium_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
