import axios from "axios";

const getCurrenciesPath = (base: string, symbols: string) => `https://api.apilayer.com/exchangerates_data/latest?base=${base}&symbols=${symbols}`

export const getCurrencies = async (base: string, symbols: string) => {
    const link = getCurrenciesPath(base, symbols)
    return await axios.get(link, {
        headers: {
            'apiKey': 'ldk7guLn8FIrxQHFGcbft9ADCR4knE4W'
        }
    })
}