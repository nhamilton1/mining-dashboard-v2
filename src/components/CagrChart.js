import React from 'react'
import { Line } from '@ant-design/charts'
import Layout from 'antd/lib/layout/layout';

const CagrChart = props => {
    const { bitcoinPriceRange } = props

    const config = {
        data: bitcoinPriceRange,
        height: 300,
        padding: 'auto',
        xField: 'Date',
        yField: 'Price',
        xAxis: {
          type: 'timeCat',
          tickCount: 5,
        },
        smooth: true,
      };


    return (
            <Line {...config} />    
    )
}

export default CagrChart
