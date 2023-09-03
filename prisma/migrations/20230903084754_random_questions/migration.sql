/*
  Warnings:

  - You are about to drop the `_QuestionToQuiz` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `languageId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_QuestionToQuiz_B_index";

-- DropIndex
DROP INDEX "_QuestionToQuiz_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_QuestionToQuiz";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    CONSTRAINT "Question_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("difficulty", "id", "text") SELECT "difficulty", "id", "text" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
