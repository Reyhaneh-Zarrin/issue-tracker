import { PrismaClient } from '@prisma/client';

const PrismaClientSingleTon = () => {
  return new PrismaClient()
}

type PrismaClientSingleTon = ReturnType<typeof PrismaClientSingleTon>

const globalForPrisma = globalThis as unknown as{
  prisma: PrismaClientSingleTon | undefined
}

const prisma = globalForPrisma.prisma ?? PrismaClientSingleTon()
export default prisma;


if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma