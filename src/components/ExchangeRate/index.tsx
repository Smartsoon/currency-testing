import React from "react";
import './index.scss'

export interface IExchangeRate {
    title: string
    value: number | string
}

const ExchangeRate: React.FC<IExchangeRate> = ({title, value}) => {
    return (
        <div className={'exchange-rate'}>
            <h4>{title}</h4>
            <span>{value}</span>
        </div>
    )
}

export default ExchangeRate