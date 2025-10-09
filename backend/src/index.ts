import 'dotenv/config'
import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'

import { loggerConfig } from './core/config/logger'
import draws from './features/draws/routes'
import prizes from './features/prizes/routes'
import tickets from './features/tickets/routes'
import { errorHandler } from './middleware/errorHandler'
import { AppContextVariables } from './shared/context/context.types'
import { createLogger } from './shared/logger/createLogger'

const logger = createLogger(loggerConfig)

const api = new OpenAPIHono<{ Variables: AppContextVariables }>()

api.get('/', (c) => {
    return c.json({ message: 'Welcome to the lottery assessment' })
})
api.route('/draws', draws as any)
api.route('/prizes', prizes as any)
api.route('/tickets', tickets as any)
api.doc('/doc', {
    openapi: '3.0.0',
    info: {
        title: 'Lottery Assessment API',
        version: '1.0.0',
        description: 'API documentation for the Lottery Assessment project'
    }
})
api.get('/ui', swaggerUI({ url: '/api/doc' }))

api.onError(errorHandler as any)

const app = new OpenAPIHono<{ Variables: AppContextVariables }>()

app.use('*', async (c, next) => {
    c.set('logger', logger)
    await next()
})

app.route('/api', api as any)

app.onError(errorHandler as any)

const port = 3000
logger.info(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})
