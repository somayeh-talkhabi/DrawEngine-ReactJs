import { OpenAPIHono } from '@hono/zod-openapi'

import { getDraw } from './services/getDraw'
import { getWinners } from './services/getWinners'
import { initiateDraw } from './services/initiateDraw'

import { withApiResponse } from '@/middleware/withApiResponse'

const draws = new OpenAPIHono()

draws.post(
    '/',
    withApiResponse(async () => {
        const result = await initiateDraw()
        return { data: result }
    })
)

draws.get(
    '/',
    withApiResponse(async () => {
        const drawsList = await getDraw()
        return { data: drawsList }
    })
)

draws.get(
    '/winners',
    withApiResponse(async () => {
        const winners = await getWinners()
        return { data: winners }
    })
)

export default draws
