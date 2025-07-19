export const calculateAmountWonInCents = (
    amountOfWinners: number,
    amountOfTickets: number | null,
    prizeAmountInCents: number
) => {
    if (!amountOfTickets) {
        return null
    }

    if (amountOfWinners === 1) {
        return prizeAmountInCents
    }

    return Math.round((prizeAmountInCents / amountOfWinners) * amountOfTickets)
}
