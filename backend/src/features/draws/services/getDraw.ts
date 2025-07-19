import { getDraws } from '../db'

export const getDraw = async () => {
    const drawsWithPrizes = await getDraws()
    return drawsWithPrizes.map((draw) => ({
        id: draw.draw_id,
        prize: {
            id: draw.prize_id,
            amountInCents: draw.prizes?.amount_in_cents
        },
        winningPostalcode: draw.winning_postalcode
    }))
}
