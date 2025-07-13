export type GoogleAuthErrorType =
    | 'TOKEN_RETRIEVAL_FAILED'
    | 'ID_TOKEN_MISSING'
    | 'USER_INFO_FETCH_FAILED'
    | 'ID_TOKEN_INVALID'
    | 'TOKEN_VERIFICATION_FAILED';

export class GoogleAuthError extends Error {
    constructor(
        public readonly type: GoogleAuthErrorType,
        message?: string
    ) {
        super(message || type);
        this.name = 'GoogleAuthError';
    }
}
