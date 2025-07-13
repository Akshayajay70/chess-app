export type GoogleAuthDTO = {
    accessToken: string,
    refreshToken: string,
    idToken: string,
    userInfo: {
        email: string,
        given_name: string,
        family_name?: string,
        picture?: string,
        sub: string,
    };
}; 