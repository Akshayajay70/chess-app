import { FromUserService } from '../../application/ports/types/index.ts';
import { IUserCreatedEventListener } from '../../application/ports/interfaces/event-listner.interface.ts';
import { Kafka } from 'kafkajs';
import { config } from '../../config/index.ts';

export class KafkaUserCreatedListener implements IUserCreatedEventListener {
    async listen(callback: (data: FromUserService) => Promise<void>): Promise<void> {
        const kafka = new Kafka({
            clientId: "rating-service",
            brokers: [config.kafkaUrl]
        })

        const consumer = kafka.consumer({ groupId: "rating-user-group" });
        await consumer.connect();
        await consumer.subscribe({ topic: "user.created", fromBeginning: false });

        await consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    const data: FromUserService = JSON.parse(message.value!.toString());
                    await callback(data);
                } catch (err) {
                    console.error("❌ Failed to process message:", err);
                }
            }
        });
    }
}