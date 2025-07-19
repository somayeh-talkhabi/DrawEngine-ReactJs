import * as db from './db'

export const getAllPrizes = async () => {
    const prizes = await db.getAllPrizes()

    return prizes.map((prize) => ({
        id: prize.prize_id,
        amountInCents: prize.amount_in_cents
    }))
}
