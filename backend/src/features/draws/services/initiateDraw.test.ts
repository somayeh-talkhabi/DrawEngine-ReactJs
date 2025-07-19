import { createDraw, getDraws } from '../db'

import { initiateDraw } from './initiateDraw'

import { getAllPrizes } from '@/features/prizes/db'
import { getRandomDistinctPostalCodes } from '@/features/tickets/db'

// mock dependencies
jest.mock('../db', () => ({
    createDraw: jest.fn(),
    getDraws: jest.fn()
}))

jest.mock('@/features/prizes/db', () => ({
    getAllPrizes: jest.fn()
}))

jest.mock('@/features/tickets/db', () => ({
    getRandomDistinctPostalCodes: jest.fn()
}))

// test data
const prizes = [
    { prize_id: 1, amount_in_cents: 1000 },
    { prize_id: 2, amount_in_cents: 2000 }
]

const postalCodes = [{ postalcode: '1234 AB' }, { postalcode: '5678 CD' }]

const createdDrawResult = [
    { draw_id: 1, prize_id: 1, winning_postalcode: '1234 AB' },
    { draw_id: 2, prize_id: 2, winning_postalcode: '5678 CD' }
]

describe('initiateDraw', () => {
    it('should throw an error if an active draw already exists', async () => {
        ;(getDraws as jest.Mock).mockResolvedValue([{ draw_id: 1 }])

        await expect(initiateDraw()).rejects.toThrow(
            'Active draw already exists'
        )
    })

    it('should throw an error if no draw records were created', async () => {
        ;(getDraws as jest.Mock).mockResolvedValue([])
        ;(getAllPrizes as jest.Mock).mockResolvedValue([])

        await expect(initiateDraw()).rejects.toThrow(
            'Error initiating new draw'
        )
    })

    it('should initiate a draw', async () => {
        ;(getDraws as jest.Mock).mockResolvedValue([])
        ;(getAllPrizes as jest.Mock).mockResolvedValue(prizes)
        ;(getRandomDistinctPostalCodes as jest.Mock).mockResolvedValue(
            postalCodes
        )
        ;(createDraw as jest.Mock).mockResolvedValue(createdDrawResult)

        const result = await initiateDraw()

        expect(result).toEqual(createdDrawResult)
    })
})
