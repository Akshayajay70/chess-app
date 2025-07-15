import { UserResponse } from "@/application/dto/user-response"
import { IEventPublisher } from "../../../application/interfaces/event-publisher.interface"
import { kafka } from "./kafka-client"

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
