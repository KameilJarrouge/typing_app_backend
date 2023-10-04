-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL DEFAULT 'admin',
    "password" TEXT NOT NULL DEFAULT 'admin'
);

-- CreateTable
CREATE TABLE "Text" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TextUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "wpm" INTEGER NOT NULL,
    "percentage" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "textId" INTEGER,
    CONSTRAINT "TextUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TextUser_textId_fkey" FOREIGN KEY ("textId") REFERENCES "Text" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Text_text_key" ON "Text"("text");
