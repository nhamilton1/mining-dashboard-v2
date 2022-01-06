import { ArrowUpOutlined } from '@ant-design/icons'
import { Card, Statistic } from 'antd'
import React from 'react'

const CagrValue = props => {
    const { cagrVal } = props
    return (
        <Card  size="small">
          <Statistic
            title={`BTC CAGR`}
            value={cagrVal}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
    )
}

export default CagrValue
