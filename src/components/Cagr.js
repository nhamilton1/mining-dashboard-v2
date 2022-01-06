import { Space, DatePicker, Col, Row} from 'antd'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import CagrChart from './CagrChart'
import { fetchBitcoinPriceRange } from '../api'
import Layout from 'antd/lib/layout/layout'
import CagrSkeleton from './CagrSkeleton'
import CagrValue from './CagrValue'

const { RangePicker } = DatePicker;
const oneYearAgoToday = moment().subtract(1, 'year').format('YYYY-MM-DD')
const todaysDate = moment(new Date()).format('YYYY-MM-DD')

const initialDates = [oneYearAgoToday ,todaysDate]

const Cagr = () => {
    const [date, setDate] = useState(initialDates)
    
    const { data: bitcoinPriceRange, isLoading } =
    useQuery(["fetchBitcoinPriceRange", date], fetchBitcoinPriceRange,
    {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    })

    if (isLoading) {
        return <CagrSkeleton />
    }
    
    let endVal = bitcoinPriceRange[bitcoinPriceRange.length - 1].Price
    let beginningVal = bitcoinPriceRange[0].Price
    let numOfYears = bitcoinPriceRange.length/365
    const cagrFormula = (endVal, beginningVal, numOfYears) => 
        `${(((Math.pow((endVal / beginningVal), 1)) - numOfYears)*100).toFixed(2)}%`
    const cagrVal = cagrFormula(endVal, beginningVal, numOfYears)


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
        const startValue = range[0].format().slice(0, 10);
        const endValue = range[1].format().slice(0, 10);
        setDate([startValue, endValue])
    }

    return (
        <Layout>
            <Row>
                <Col span={19}>
                    <CagrChart bitcoinPriceRange={bitcoinPriceRange}/>
                </Col>
                <Col span={5} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow:'column wrap'}}>
                    <CagrValue cagrVal={cagrVal} />
                    <CagrValue cagrVal={cagrVal} />
                    <CagrValue cagrVal={cagrVal} />
                </Col>
            </Row>
                <Space direction="vertical" size={12}>
                    <RangePicker 
                        format={dateFormat}
                        disabledDate={disabledDate}
                        onChange={onChangeSetDate}
                        defaultValue={[
                            moment(oneYearAgoToday),
                            moment(todaysDate)
                        ]}
                        />
                </Space>
        </Layout>
    )
}

export default Cagr
