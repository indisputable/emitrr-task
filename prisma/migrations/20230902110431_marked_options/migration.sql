-- CreateTable
CREATE TABLE "MarkedOption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "optionId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "resultId" INTEGER NOT NULL,
    CONSTRAINT "MarkedOption_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MarkedOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MarkedOption_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
