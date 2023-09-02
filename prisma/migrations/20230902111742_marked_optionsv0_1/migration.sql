/*
  Warnings:

  - You are about to drop the `MarkedOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MarkedOption";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_OptionToResult" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_OptionToResult_A_fkey" FOREIGN KEY ("A") REFERENCES "Option" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OptionToResult_B_fkey" FOREIGN KEY ("B") REFERENCES "Result" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_OptionToResult_AB_unique" ON "_OptionToResult"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionToResult_B_index" ON "_OptionToResult"("B");
