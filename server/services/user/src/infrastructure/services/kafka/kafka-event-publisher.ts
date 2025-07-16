import { UserResponse } from "@/application/dto/user-response"
import { IEventPublisher } from "../../../application/interfaces/event-publisher.interface"
import { kafka } from "./kafka-client"
import { IUserCreatedEventListener, Payload } from "@/application/interfaces/event-listner.interface"

export class KafkaEventPublisher implements IEventPublisher {
  private producer = kafka.producer()

  async publish(eventName: string, payload: UserResponse): Promise<void> {
    await this.producer.connect()
    await this.producer.send({
      topic: eventName,
      messages: [{ value: JSON.stringify(payload) }]
    })
    await this.producer.disconnect()
  }
}

export class EventUserStatusUpdatedListner implements IUserCreatedEventListener {
  private producer = kafka.producer();

  async listen(callback: (data: Payload) => Promise<void>): Promise<void> {
    const consumer = kafka.consumer({ groupId: "user-status-group" });

    await consumer.connect();
    await consumer.subscribe({ topic: "user.status.updated", fromBeginning: false })

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const data = JSON.parse(message.value!.toString());
          await callback(data)
        } catch (error) {
          console.error("❌ Failed to process message:", error);
        }
      }
    })
  }

}
