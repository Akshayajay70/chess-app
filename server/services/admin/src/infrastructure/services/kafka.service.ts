import { Kafka } from "kafkajs";
import { IUserCreatedEventListener } from "../../application/interfaces/event-listner.interface";
import { AdminResponse } from "../../application/dtos/admin-response";
import { config } from "../../config/index";

export class KafkaUserCreatedListener implements IUserCreatedEventListener {
    async listen(callback: (data: AdminResponse) => Promise<void>): Promise<void> {
        const kafka = new Kafka({
            clientId: "admin-service",
            brokers: [config.kafkaUrl]
        });

        const consumer = kafka.consumer({ groupId: "admin-user-group" });
        await consumer.connect();
        await consumer.subscribe({ topic: "user.created", fromBeginning: false });

        await consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    const data: AdminResponse = JSON.parse(message.value!.toString());
                    await callback(data);
                } catch (err) {
                    console.error("❌ Failed to process message:", err);
                }
            }
        });
    }
}
