import winston from 'winston'

const env = process.env.NODE_ENV || 'development'

let loggerConfig: winston.LoggerOptions

if (env === 'development') {
    loggerConfig = {
        level: 'debug',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
        transports: [new winston.transports.Console()]
    }
} else {
    // production logging
    loggerConfig = {
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'lottery' },
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: 'error.log',
                level: 'error'
            })
            // Log to Sentry or other logging service...
        ]
    }
}

export { loggerConfig }
