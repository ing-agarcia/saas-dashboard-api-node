import { createClient } from "redis";

export class RedisEventSubscriber {
    private readonly channel = "opportunities-events";
    private subscriber = createClient({
        url: "redis://localhost:6379"
    });

    async start(): Promise<void> {
        await this.subscriber.connect();

        await this.subscriber.subscribe(this.channel, (message) => {
            const event = JSON.parse(message);

            console.log("Evento recibido:", event);

            // luego se podría:
            // - auditoría
            // - métricas
            // - alertas
        });
    }
}