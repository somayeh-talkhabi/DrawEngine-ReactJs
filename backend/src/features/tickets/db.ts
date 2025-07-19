import { prisma } from '@/core/prisma'

export async function getRandomDistinctPostalCodes(
    count: number
): Promise<{ postalcode: string }[]> {
    // prisma does not have support for random orderBy (yet... 🤞).
    return await prisma.$queryRaw<{ postalcode: string }[]>`
        SELECT postalcode
        FROM (
            SELECT DISTINCT postalcode
            FROM tickets
        ) AS sub
        ORDER BY RANDOM()
        LIMIT ${count}
    `
}

export async function getTicketsByPostalCodes(postalCodes: string[]) {
    return await prisma.tickets.findMany({
        where: { postalcode: { in: postalCodes } }
    })
}
