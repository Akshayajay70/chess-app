import { Kafka } from "kafkajs";
import { config } from "../../../config/index.ts";

export const kafka = new Kafka({
    clientId: "user-service",
    brokers: [config.kafkaUrl]
});
