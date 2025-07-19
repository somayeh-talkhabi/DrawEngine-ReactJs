import { prisma } from '@/core/prisma'

export async function getDraws() {
    return prisma.draws.findMany({
        include: {
            prizes: true
        }
    })
}

export async function getWinners() {
    const draws = await prisma.draws.findMany({
        include: {
            prizes: true
        }
    })

    const winners = await prisma.tickets.findMany({
        where: {
            postalcode: {
                in: draws.map((draw) => draw.winning_postalcode as string)
            }
        }
    })

    return { draws, winners }
}

export async function getDrawById(id: number) {
    return prisma.draws.findUnique({ where: { draw_id: id } })
}

export async function createDraw(
    prizesPostalCodes: { prize_id: number; winning_postalcode: string }[]
) {
    await prisma.draws.createMany({ data: prizesPostalCodes })
    return await prisma.draws.findMany()
}
