import { redisClient } from "./redis.client.js";

export class RedisEventPublisher {
    private readonly channel = "opportunities-events";

    async publish(event: unknown): Promise<void> {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }

        await redisClient.publish(
            this.channel,
            JSON.stringify(event)
        );
    }
}