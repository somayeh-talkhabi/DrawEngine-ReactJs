import { OpenAPIHono } from '@hono/zod-openapi'

import { getAllPrizes } from './service'

import { withApiResponse } from '@/middleware/withApiResponse'

const prizes = new OpenAPIHono()

prizes.get(
    '/',
    withApiResponse(async () => {
        const prizes = await getAllPrizes()
        return { data: prizes }
    })
)

export default prizes
