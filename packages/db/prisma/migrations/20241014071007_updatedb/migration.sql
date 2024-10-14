-- AlterTable
ALTER TABLE "Merchant" ALTER COLUMN "name" SET DEFAULT 'merchant';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT DEFAULT 'user';
