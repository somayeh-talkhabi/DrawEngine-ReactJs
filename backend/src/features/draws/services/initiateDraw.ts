import { createDraw, getDraws } from '../db'
import { DrawExistsError, InitiateDrawError } from '../types'

import { getAllPrizes } from '@/features/prizes/db'
import { getRandomDistinctPostalCodes } from '@/features/tickets/db'

export const initiateDraw = async () => {
    const draws = await getDraws()

    if (draws.length > 0) {
        throw DrawExistsError('Active draw already exists', 400)
    }

    const prizes = await getAllPrizes()
    const winningPostalCodes = await getRandomDistinctPostalCodes(prizes.length)

    const postalCodePerPrize = prizes.map((prize, index) => ({
        prize_id: prize.prize_id,
        winning_postalcode: winningPostalCodes[index].postalcode
    }))

    const result = await createDraw(postalCodePerPrize)

    if (!result || result.length === 0) {
        throw InitiateDrawError('Error initiating new draw', 400)
    }

    return result
}
