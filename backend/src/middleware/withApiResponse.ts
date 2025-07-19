import { Context } from 'hono'

import { ApiResponse } from '@/shared/error/types'

export const withApiResponse = <T>(
    handler: (c: Context) => Promise<ApiResponse<T>> | ApiResponse<T>
) => {
    return async (c: Context) => {
        const result = await handler(c)
        const { data, status = 200, meta } = result
        return c.json({ data, meta }, { status })
    }
}
