import { Context, ErrorHandler } from 'hono'

import { ErrorResponse } from '@/shared/error/types'
import { ApiError } from '@/shared/error/utils'

const getResponseError = (err: Error): ErrorResponse => {
    console.error(err)

    // Expected error
    if (err instanceof ApiError) {
        return {
            message: err.message,
            code: err.code,
            status: err.status,
            meta: err.meta,
            stack: err.stack
        }
    }

    // Unhandled error
    if (err instanceof Error) {
        return {
            message: 'Internal server error',
            status: 500,
            code: 'INTERNAL_SERVER_ERROR',
            meta: { message: err.message },
            stack: err.stack
        }
    }

    // Undefined error
    return {
        message: 'Internal server error',
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        meta: { message: 'Unknown error' },
        stack: undefined
    }
}

export const errorHandler: ErrorHandler = (error: Error, c: Context) => {
    const logger = c.get('logger')

    const { message, status, code, meta, stack } = getResponseError(error)

    if (process.env.NODE_ENV === 'development') {
        logger.error(message, error, status, code, stack, meta)
    }

    return c.json(
        {
            message,
            status,
            code,
            meta: process.env.NODE_ENV === 'development' ? meta : undefined,
            stack: process.env.NODE_ENV === 'development' ? stack : undefined
        },
        { status }
    )
}
