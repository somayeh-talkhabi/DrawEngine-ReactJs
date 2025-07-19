import { calculateAmountWonInCents } from './calculateAmountWonInCents'

describe('calculateAmountWonInCents', () => {
    it('should return the prize amount if there is only one winner', () => {
        const result = calculateAmountWonInCents(1, 1, 100)
        expect(result).toBe(100)
    })

    it('should split the prize amount between winners', () => {
        const result = calculateAmountWonInCents(2, 1, 100)
        expect(result).toBe(50)
    })

    it('should calculate the prize amount based on the amount of tickets', () => {
        const result = calculateAmountWonInCents(2, 5, 100)
        expect(result).toBe(250)
    })

    it('should round to whole cents', () => {
        const result = calculateAmountWonInCents(3, 1, 100)
        expect(result).toBe(33)
    })
})
