export type Meta = Record<string, unknown> | undefined

export type ApiResponse<T> = {
    data: T
    status?: number
    meta?: Meta
}

export type ErrorResponse = {
    message: string
    status: number
    code: string
    meta?: Meta
    stack?: string
}
