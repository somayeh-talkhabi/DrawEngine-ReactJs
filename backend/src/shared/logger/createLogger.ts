import winston, { LoggerOptions, Logger as WinstonLogger } from 'winston'

import { Logger } from './types'

export function createLogger(config: LoggerOptions): Logger {
    const winstonLogger: WinstonLogger = winston.createLogger(config)

    return {
        info: (message: string, meta?: object) => {
            winstonLogger.info(message, meta)
        },
        warn: (message: string, meta?: object) => {
            winstonLogger.warn(message, meta)
        },
        error: (message: string, error: Error, meta?: object) => {
            winstonLogger.error(message, {
                error: error.stack || error.message,
                ...meta
            })
        },
        debug: (message: string, meta?: object) => {
            winstonLogger.debug(message, meta)
        }
    }
}
