import * as db from '../db'
import { calculateAmountWonInCents } from '../utils/calculateAmountWonInCents'

export const getWinners = async () => {
    const { draws, winners } = await db.getWinners()
    const drawWithWinners = draws.map((draw) => {
        const winnersForDraw = winners.filter(
            (winner) => winner.postalcode === draw.winning_postalcode
        )

        const winnersForDrawWithAmountWonInCents = winnersForDraw.map(
            (winner) => ({
                ...winner,
                amountWonInCents: calculateAmountWonInCents(
                    winnersForDraw.length,
                    winner.amount_of_tickets,
                    draw.prizes!.amount_in_cents!
                )
            })
        )

        return {
            id: draw.draw_id,
            winningPostalcode: draw.winning_postalcode,
            prize: {
                id: draw.prizes?.prize_id,
                amountInCents: draw.prizes?.amount_in_cents
            },
            winners: winnersForDrawWithAmountWonInCents.map((winner) => ({
                id: winner.ticket_id,
                username: winner.username,
                housenumber: winner.housenumber,
                city: winner.city,
                postalcode: winner.postalcode,
                amountOfTickets: winner.amount_of_tickets,
                amountWonInCents: winner.amountWonInCents
            }))
        }
    })

    return drawWithWinners
}
