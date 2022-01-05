import { Space, DatePicker, Spin} from 'antd'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchBitcoinPriceRange } from '../api'

const { RangePicker } = DatePicker;

const Cagr = () => {
    const [date, setDate] = useState([moment().subtract(1, 'year').format('YYYY-MM-DD') , moment(new Date()).format('YYYY-MM-DD')])
    
    const { data: bitcoinPriceRange, isLoading } =
    useQuery(["fetchBitcoinPriceRange", date], fetchBitcoinPriceRange,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity
    })

    if (isLoading) {
        return <Spin/>
    }
    

    let endVal = bitcoinPriceRange.slice(-1)[0].Price
    let beginningVal = bitcoinPriceRange[0].Price
    let numOfYears = bitcoinPriceRange.length/365
    const cagrFormula = (endVal, beginningVal, numOfYears) => (((Math.pow((endVal / beginningVal), 1)) - numOfYears)*100).toFixed(4)
    cagrFormula(endVal, beginningVal, numOfYears)
    

    

    const dateFormat = 'YYYY-MM-DD';

    const disabledDate = current => {
        let start = '2010-07-17';
        let end = Date.now();
        if (current < moment(start)){
            return true;
        }
        else if (current > moment(end)){
            return true;
        }
        else {
            return false; 
        }
    }

    const onChangeSetDate = (range) => {
        const valueOfInput1 = range[0].format().slice(0, 10);
        const valueOfInput2 = range[1].format().slice(0, 10);
        setDate([valueOfInput1, valueOfInput2])
    }

    return (
        <Space direction="vertical" size={12}>
            <RangePicker 
                format={dateFormat}
                disabledDate={disabledDate}
                onChange={onChangeSetDate}
            />
        </Space>
    )
}

export default Cagr
