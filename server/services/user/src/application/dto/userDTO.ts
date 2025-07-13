export type UserDTO = {
    _id: string;
    googleId: string;
    email: string;
    gameId: string;
    name: string;
    status: "active" | "banned" | "suspended";
    createdAt: Date;
    updatedAt: Date;
};
