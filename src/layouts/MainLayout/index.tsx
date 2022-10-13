import React, {ReactElement, useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import ExchangeRate from "../../components/ExchangeRate";
import './index.scss'
import { getCurrencies } from '../../api/currencies';
import {currencies, ILatestCurrency } from '../../models/currency';
import Toastify from "../../components/Toastify";

interface IMainLayout {
    children: ReactElement
}

const MainLayout: React.FC<IMainLayout> = ({children}) => {
    const [uah, setUah] = useState<ILatestCurrency | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getCurrency()
    }, [])

    const getCurrency = async () => {
        await getCurrencies('UAH', 'USD,EUR')
            .then(response => {
                setUah(response.data)
                setError(null)
            })
            .catch(error => {
                setError(error.message)
            })
    }

    const getRoundedRateOrWait = (value: number | null | undefined): number | string => {
        if (!value) return 'Waiting...'
        return (1 / value).toFixed(2)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Toastify errorText={error}/>
            <AppBar position="static">
                <div className={'app-header'}>
                    <div className={'app-header__currencies'}>
                        <ExchangeRate title={currencies.USD} value={getRoundedRateOrWait(uah?.rates[currencies.USD])}/>
                        <ExchangeRate title={currencies.EUR} value={getRoundedRateOrWait(uah?.rates[currencies.EUR])}/>
                    </div>
                    <small>{uah?.date}</small>
                </div>
            </AppBar>
            {children}
        </Box>
    )
}

export default MainLayout