import { OpenAPIHono } from '@hono/zod-openapi'
import { prisma } from '@/core/prisma'
import { withApiResponse } from '@/middleware/withApiResponse'

const tickets = new OpenAPIHono()

tickets.get('/', withApiResponse(async () => {
    const allTickets = await prisma.tickets.findMany()
    return { data: allTickets }
}))

export default tickets 