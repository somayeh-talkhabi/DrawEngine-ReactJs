import { createCustomError } from '@/shared/error/utils'

export interface Draw {
    id: number
    prizeId: number
    winningPostalcode: string
}

export const DrawExistsError = createCustomError(
    'DrawExistsError',
    'DRAW_EXISTS'
)

export const InitiateDrawError = createCustomError(
    'InitiateDrawError',
    'INITIATE_DRAW_ERROR'
)
