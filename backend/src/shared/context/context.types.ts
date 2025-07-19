import { Logger } from '../logger/types'

export interface AppContextVariables {
    logger: Logger
    data?: unknown
    [key: string]: unknown
}
