-- CreateTable
CREATE TABLE "_id" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,
    "txId" TEXT NOT NULL,
    "buyerName" TEXT,
    "buyerUser" TEXT,
    "remarketStage" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "_id_chatId_key" ON "_id"("chatId");
