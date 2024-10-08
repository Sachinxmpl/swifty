-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "emaiil" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
