/*
  Warnings:

  - Added the required column `languageId` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LanguageToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LanguageToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Language" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LanguageToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Quiz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "languageId" INTEGER NOT NULL,
    CONSTRAINT "Quiz_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Quiz" ("id", "name") SELECT "id", "name" FROM "Quiz";
DROP TABLE "Quiz";
ALTER TABLE "new_Quiz" RENAME TO "Quiz";
CREATE TABLE "new_Option" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Option" ("id", "questionId", "text") SELECT "id", "questionId", "text" FROM "Option";
DROP TABLE "Option";
ALTER TABLE "new_Option" RENAME TO "Option";
CREATE TABLE "new_Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "score" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Result_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Result" ("id", "quizId", "userId") SELECT "id", "quizId", "userId" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_LanguageToUser_AB_unique" ON "_LanguageToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LanguageToUser_B_index" ON "_LanguageToUser"("B");
