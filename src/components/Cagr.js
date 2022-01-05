import { Space, DatePicker, Spin} from 'antd'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchBitcoinPriceRange } from '../api'

const { RangePicker } = DatePicker;

const Cagr = () => {
    const [date, setDate] = useState([])
    
    const { data: bitcoinPriceRange, isLoading: bitcoinPriceRangeIsLoading } =
    useQuery(["fetchBitcoinPriceRange", date], fetchBitcoinPriceRange,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity
    })

    if (bitcoinPriceRangeIsLoading) {
        return <Spin/>
    }

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
