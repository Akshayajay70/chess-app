export type TokenPayload = {
    email: string,
    gameId: string,
    role: 'admin' | 'user',
    name: string,
    iat?: number,
    exp?: number
}