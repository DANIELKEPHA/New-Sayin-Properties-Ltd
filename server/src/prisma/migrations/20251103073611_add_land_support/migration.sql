/*
  Warnings:

  - The values [Rooms,Tinyhouse] on the enum `PropertyType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `amenities` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `postedDate` on the `Property` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyCategory" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'LAND');

-- CreateEnum
CREATE TYPE "Infrastructure" AS ENUM ('Water', 'Electricity', 'RoadAccess', 'Sewerage', 'Internet', 'StreetLighting', 'Fence');

-- CreateEnum
CREATE TYPE "PaymentPlan" AS ENUM ('FULL_PAYMENT', 'INSTALLMENTS', 'FLEXIBLE');

-- CreateEnum
CREATE TYPE "PriceUnit" AS ENUM ('PER_MONTH', 'PER_YEAR', 'PER_SQM', 'PER_ACRE', 'TOTAL');

-- CreateEnum
CREATE TYPE "SizeUnit" AS ENUM ('SQM', 'ACRES', 'HECTARES');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('AVAILABLE', 'SOLD', 'RENTED', 'PENDING');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Amenity" ADD VALUE 'Security';
ALTER TYPE "Amenity" ADD VALUE 'Balcony';
ALTER TYPE "Amenity" ADD VALUE 'Garden';

-- AlterEnum
BEGIN;
CREATE TYPE "PropertyType_new" AS ENUM ('Apartment', 'Condo', 'Townhouse', 'Villa', 'Cottage', 'Bungalow', 'Mansion', 'Duplex', 'TinyHouse', 'Room', 'ServicedApartment', 'Penthouse', 'Office', 'Retail', 'Warehouse', 'Industrial', 'Hotel', 'Restaurant', 'Farmhouse', 'ResidentialLand', 'CommercialLand', 'AgriculturalLand', 'MixedUseLand', 'Land');
ALTER TABLE "Property" ALTER COLUMN "propertyType" TYPE "PropertyType_new" USING ("propertyType"::text::"PropertyType_new");
ALTER TYPE "PropertyType" RENAME TO "PropertyType_old";
ALTER TYPE "PropertyType_new" RENAME TO "PropertyType";
DROP TYPE "PropertyType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_managerCognitoId_fkey";

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "applicationDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "status" SET DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "amenities",
DROP COLUMN "name",
DROP COLUMN "postedDate",
ADD COLUMN     "category" "PropertyCategory" NOT NULL DEFAULT 'RESIDENTIAL',
ADD COLUMN     "infrastructure" "Infrastructure"[],
ADD COLUMN     "isForRent" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isForSale" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "listedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentPlan" "PaymentPlan",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "priceUnit" "PriceUnit" NOT NULL DEFAULT 'PER_MONTH',
ADD COLUMN     "size" DOUBLE PRECISION,
ADD COLUMN     "sizeUnit" "SizeUnit",
ADD COLUMN     "status" "ListingStatus" NOT NULL DEFAULT 'AVAILABLE',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Untitled Property',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "pricePerMonth" DROP NOT NULL,
ALTER COLUMN "securityDeposit" DROP NOT NULL,
ALTER COLUMN "applicationFee" DROP NOT NULL,
ALTER COLUMN "photoUrls" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "beds" DROP NOT NULL,
ALTER COLUMN "baths" DROP NOT NULL,
ALTER COLUMN "squareFeet" DROP NOT NULL,
ALTER COLUMN "propertyType" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_managerCognitoId_fkey" FOREIGN KEY ("managerCognitoId") REFERENCES "Manager"("cognitoId") ON DELETE CASCADE ON UPDATE CASCADE;
