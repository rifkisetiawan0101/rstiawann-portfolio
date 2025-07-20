import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma =
    global.prisma ||
    new PrismaClient({
        // log: ['query'], // Uncomment baris ini untuk melihat query SQL di terminal
    });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
