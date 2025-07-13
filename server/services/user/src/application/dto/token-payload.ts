export type TokenPayload = {
    email: string,
    gameId: string,
    role: 'admin' | 'user',
    iat?: number,
    exp?: number
}