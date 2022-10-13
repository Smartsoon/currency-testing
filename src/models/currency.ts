export enum currencies {
    UAH = 'UAH',
    USD = 'USD',
    EUR = 'EUR'
}

export interface ILatestCurrency {
    base: string,
    date: string,
    rates: Record<string, number>,
    success: boolean
    timestamp: number
}