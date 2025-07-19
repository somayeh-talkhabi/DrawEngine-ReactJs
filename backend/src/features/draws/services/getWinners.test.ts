import { getWinners as getWinnersDB } from '../db'

import { getWinners } from './getWinners'

// mock dependencies
jest.mock('../db', () => ({
    getWinners: jest.fn()
}))

// test data
const draws = [
    {
        draw_id: 1,
        prizes: { prize_id: 1, amount_in_cents: 1000 },
        winning_postalcode: '1234 AB'
    },
    {
        draw_id: 2,
        prizes: { prize_id: 2, amount_in_cents: 2000 },
        winning_postalcode: '5678 CD'
    }
]

const winners = [
    {
        ticket_id: 1,
        username: 'user1',
        housenumber: '1',
        city: 'city1',
        postalcode: '1234 AB',
        amount_of_tickets: 1
    },
    {
        ticket_id: 2,
        username: 'user2',
        housenumber: '2',
        city: 'city2',
        postalcode: '5678 CD',
        amount_of_tickets: 5
    }
]

const winnersDBResult = { draws, winners }

const expected = [
    {
        id: 1,
        winningPostalcode: '1234 AB',
        prize: {
            id: 1,
            amountInCents: 1000
        },
        winners: [
            {
                id: 1,
                username: 'user1',
                housenumber: '1',
                city: 'city1',
                postalcode: '1234 AB',
                amountOfTickets: 1,
                amountWonInCents: 1000
            }
        ]
    },
    {
        id: 2,
        winningPostalcode: '5678 CD',
        prize: {
            id: 2,
            amountInCents: 2000
        },
        winners: [
            {
                id: 2,
                username: 'user2',
                housenumber: '2',
                city: 'city2',
                postalcode: '5678 CD',
                amountOfTickets: 5,
                amountWonInCents: 2000
            }
        ]
    }
]

describe('getWinners', () => {
    it('should return winners with amount won in cents', async () => {
        ;(getWinnersDB as jest.Mock).mockResolvedValue(winnersDBResult)
        const result = await getWinners()
        expect(result).toEqual(expected)
    })
})
