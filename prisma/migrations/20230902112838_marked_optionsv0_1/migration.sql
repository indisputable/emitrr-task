-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "score" INTEGER,
    "userId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Result_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Result" ("id", "quizId", "score", "userId") SELECT "id", "quizId", "score", "userId" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
