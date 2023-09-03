-- CreateTable
CREATE TABLE "_QuestionToResult" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_QuestionToResult_A_fkey" FOREIGN KEY ("A") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QuestionToResult_B_fkey" FOREIGN KEY ("B") REFERENCES "Result" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToResult_AB_unique" ON "_QuestionToResult"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToResult_B_index" ON "_QuestionToResult"("B");
