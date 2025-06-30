-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('USER', 'MODER', 'ADMIN');

-- CreateEnum
CREATE TYPE "USER_STATUS" AS ENUM ('ACTIVE', 'BLOCKED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "imageUrl" TEXT NOT NULL,
    "discordId" TEXT,
    "discordUser" TEXT,
    "userStatus" "USER_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "telegram" TEXT,
    "codeWord" TEXT,
    "role" "USER_ROLE" NOT NULL DEFAULT 'USER',
    "premium" BOOLEAN DEFAULT false,
    "realName" TEXT,
    "realNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cardNumber" INTEGER,
    "cvv" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "sender" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transactionSenderId" INTEGER NOT NULL,
    "transactionRecipientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_transactionSenderId_fkey" FOREIGN KEY ("transactionSenderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_transactionRecipientId_fkey" FOREIGN KEY ("transactionRecipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
