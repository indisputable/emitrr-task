-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Result_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Result" ("id", "quizId", "score", "totalScore", "userId") SELECT "id", "quizId", coalesce("score", 0) AS "score", coalesce("totalScore", 0) AS "totalScore", "userId" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
CREATE UNIQUE INDEX "Result_quizId_userId_key" ON "Result"("quizId", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
