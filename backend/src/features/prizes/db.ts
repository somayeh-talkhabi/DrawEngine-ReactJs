import { prisma } from '@/core/prisma'

export async function getAllPrizes() {
    return prisma.prizes.findMany()
}

export async function getPrizeById(id: number) {
    return prisma.prizes.findUnique({ where: { prize_id: id } })
}
