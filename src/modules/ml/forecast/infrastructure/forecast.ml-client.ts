export class ForecastMLClient {
    async predict(values: number[]) {
        try {
            const res = await fetch("http://127.0.0.1:8000/forecast", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ values })
            });

            const data = await res.json();
            return data.prediction;
        } catch {
            return null;
        }
    }
}