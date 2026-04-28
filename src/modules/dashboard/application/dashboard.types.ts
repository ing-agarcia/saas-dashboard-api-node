export type Kpis = {
    totalOpps: number;
    totalValue: number;
    weightedValue: number;
    winRate: number;
};

export type ByStage = {
    stage: string;
    totalOpps: number;
    totalOppsPct: number;
    totalValue: number;
    totalValuePct: number;
}

export type TrendRaw = {
    month: number;
    currentYear: number;
    lastYear: number;
};

export type Trend = {
    month: number;
    nameMonth: string;
    currentYear: number;
    lastYear: number;
};
