export class ForecastMLClient {
    async predict(values: number[], model: string) {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/forecast", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        values,
                        model
                    }
                )
            });

            return await res.json();
        } catch {
            return null;
        }
    }
}