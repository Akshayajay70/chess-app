import { IFriendsRepo } from "../application/ports/interfaces/friends-repo";
import { FriendsModel } from "./friends.model";
import { ReturnData, FriendsProps, DBReturnData, PendingReqOutput, FriendInput } from "../application/ports/types";
import { DatabaseError } from "../domain/errors/database.error";

export class FriendsRepo implements IFriendsRepo {
    async createFriendRequest(data: FriendsProps): Promise<boolean> {
        try {
            await FriendsModel.create({
                senderId: data.senderId,
                senderName: data.receiverId,
                receiverId: data.receiverId,
                receiverName: data.receiverName,
                status: 'pending'
            })

            return true
        } catch (error) {
            throw new DatabaseError(
                'CREATE',
                'Friends',
                error instanceof Error
                    ? error
                    : new Error('unknown error')
            )
        }
    }

    async getPendingRequest(id: string): Promise<PendingReqOutput[]> {
        try {
            const requests = await FriendsModel.find({
                receiverId: id
            })

            const response: PendingReqOutput[] = requests.map((item) => {
                return {
                    senderId: item.senderId,
                    senderName: item.senderName
                }
            })

            return response;
        } catch (error) {
            throw new DatabaseError(
                'READ',
                'Friends',
                error instanceof Error
                    ? error
                    : new Error('unknown error')
            )
        }
    }

    async removeRequest(data: FriendInput): Promise<boolean> {
        try {
            const { senderId, receiverId } = data;
            const response = await FriendsModel.deleteOne({
                senderId: senderId,
                receiverId: receiverId
            });

            return response.deletedCount === 1
        } catch (error) {
            throw new DatabaseError(
                'DELETE',
                'Friends',
                error instanceof Error
                    ? error
                    : new Error('unknown error')
            )
        }
    }

    async friendStatus({ senderId, receiverId }: FriendsProps): Promise<DBReturnData | null> {
        try {
            const friend = await FriendsModel.findOne({
                $or: [
                    { senderId, receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ]
            });

            if (!friend) return null;

            return {
                ...friend.toObject(),
                _id: friend._id.toString()
            };
        } catch (error) {
            throw new DatabaseError(
                'CREATE',
                'Friends',
                error instanceof Error
                    ? error
                    : new Error('unknown error')
            )
        }
    }

    async getFriendsData(id: string, search: string, limit: number, status: string): Promise<ReturnData> {
        try {
            const query = search
                ? {
                    $or: [
                        { senderId: { $regex: search, $options: 'i' } },
                        { receiverId: { $regex: search, $options: 'i' } },
                        { senderName: { $regex: search, $options: 'i' } },
                        { receiverName: { $regex: search, $options: 'i' } },
                    ]
                } : {}

            const friends = await FriendsModel.find({
                $and: [
                    {
                        $or: [
                            { senderId: id },
                            { receiverId: id }
                        ]
                    },
                    query,
                    { status: status }
                ]
            }).limit(limit);

            const total = friends.length;

            console.log(total)

            const mappedFriends = friends.map(friend => {
                // Determine the other user's id and name
                const isSender = friend.senderId === id;
                return {
                    id: isSender ? friend.receiverId : friend.senderId,
                    name: isSender ? friend.receiverName : friend.senderName
                };
            });

            return {
                friendData: mappedFriends,
                total: total
            }
        } catch (error) {
            throw new DatabaseError(
                'READ',
                'Friends',
                error instanceof Error
                    ? error
                    : new Error('unknown error')
            )
        }
    }

    async removeFriend({ senderId, receiverId }: FriendsProps): Promise<boolean> {
        try {
            const data = await FriendsModel.findOneAndDelete(
                {
                    $or: [
                        {
                            senderId: senderId,
                            receiverId: receiverId
                        },
                        {
                            senderId: receiverId,
                            receiverId: senderId
                        }
                    ]
                }
            )

            if (data) return true;
            return false;
        } catch (error) {
            throw new DatabaseError(
                'CREATE',
                'Friends',
                error instanceof Error
                    ? error
                    : new Error('unknown error')
            )
        }
    }

    async updateFriend({ senderId, receiverId, status }: FriendsProps): Promise<{ success: boolean, message: string }> {
        try {
            const data = await FriendsModel.findOneAndUpdate(
                {
                    $or: [
                        {
                            senderId: senderId,
                            receiverId: receiverId
                        },
                        {
                            senderId: receiverId,
                            receiverId: senderId
                        }
                    ]
                },
                {
                    status: status
                }

            )
            if (data) return { success: true, message: `Updated ${status} successfully` };
            return { success: false, message: "No friend found" };
        } catch (error) {
            throw new DatabaseError(
                'CREATE',
                'Friends',
                error instanceof Error
                    ? error
                    : new Error('unknown error')
            )
        }
    }
}