import React, {useEffect, useState} from 'react'
import {currencies} from "../../models/currency";
import {getCurrencies} from "../../api/currencies";
import Toastify from "../../components/Toastify";
import {Autocomplete, Input, TextField} from '@mui/material';
import './index.scss'

interface ICurrencyInput {
    id: string,
    currency: currencies
    value: string
}

const Exchange: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const [inputs, setInputs] = useState<ICurrencyInput[]>([
        {
            id: '1',
            currency: currencies.UAH,
            value: ''
        },
        {
            id: '2',
            currency: currencies.USD,
            value: ''
        }
    ])
    const [rate, setRate] = useState<number>(1)
    const [currentSelect, setCurrentSelect] = useState<number | null>(null)

    useEffect(() => {
        getCurrency(inputs[0].currency, inputs[1].currency)
    }, [inputs[0].currency, inputs[1].currency])

    const arrayOfOptions = Object.keys(currencies) as Array<keyof typeof currencies>

    const getCurrency = async (firstInput: string, secondInput: string, index?: number) => {
        await getCurrencies(firstInput, secondInput)
            .then(response => {
                const updatedRate = response?.data?.rates[secondInput]
                setRate(updatedRate)
                setError(null)
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    }

    const onSelectAutocomplete = (value: any, index: number) => {
        setCurrentSelect(index)
        const updatedInput = inputs.map((input, updatedAutocompleteIndex) => {
            if (updatedAutocompleteIndex === index) {
                input.currency = value
                return input
            } else {
                return input
            }
        })
        setInputs(updatedInput)
    }

    useEffect(() => {
        if (currentSelect !== null) {
            const updatedInputs = inputs.map((input, updatedInputIndex) => {
                if (updatedInputIndex === currentSelect) {
                    return input
                } else {
                    input.value = (updatedInputIndex === 0 ? +inputs[currentSelect].value / rate : +inputs[currentSelect].value * rate).toFixed(2).toString()
                    return input
                }
            })
            setInputs(updatedInputs)
        }
    }, [rate])

    const onChangeInput = (value: string, index: number) => {
        setCurrentSelect(null)
        if (!isNaN(+value) || value === '') {
            const updatedInputs = inputs.map((input, updatedInputIndex) => {
                if (updatedInputIndex === index) {
                    input.value = value
                    return input
                } else {
                    input.value = (updatedInputIndex === 0 ? +value / rate : +value * rate).toFixed(2).toString()
                    return input
                }
            })
            setInputs(updatedInputs)
        }
    }

    return (
        <div className={'exchange'}>
            <Toastify errorText={error}/>
            {inputs.map((input, index) => {
                return <div key={input.id} className={'exchange__input-blocks'}>
                    <Autocomplete
                        disablePortal
                        className={'exchange__input-blocks__autocomplete'}
                        options={arrayOfOptions}
                        sx={{ width: 210 }}
                        value={input.currency}
                        onChange={(event, value) => {
                            onSelectAutocomplete(value, index)
                        }}
                        renderInput={(params) => <TextField {...params}/>}
                    />
                    <TextField value={input.value}
                               onChange={event => onChangeInput(event.target.value, index)}/>
                </div>
            })}
        </div>
    )
}

export default Exchange