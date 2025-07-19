import { Meta } from './types'

export class ApiError extends Error {
    status: number
    code: string
    meta?: Meta

    constructor(
        message: string,
        status: number = 500,
        code: string = 'UNKNOWN_ERROR',
        meta?: Meta
    ) {
        super(message)
        this.status = status
        this.code = code
        this.meta = meta
    }
}

export const createCustomError = (name: string, code: string) => {
    return (message: string, status: number = 500) => {
        const err = new ApiError(message, status, code)
        err.name = name
        return err
    }
}
