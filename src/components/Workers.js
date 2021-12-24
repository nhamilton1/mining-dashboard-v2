import { Spin, Table, Tag } from 'antd'
import Layout from 'antd/lib/layout/layout'
import React from 'react'
import { useQuery } from 'react-query'
import { fetchWorkers } from '../api'
import { Skeleton } from 'antd'

const Workers = () => {
    const {data, isLoading} = useQuery('fetchWorkers', fetchWorkers)

    if(isLoading){
        return <Skeleton paragraph={{ rows: 10 }}/>
    }

    const dataSource = []
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hash Scoring',
            dataIndex: 'HashScore',
            key: 'Hash Scoring',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.HashScore - b.HashScore,
        },
        {
            title: '5min Hash',
            dataIndex: 'FiveHash',
            key: '5min Hash',
        },
        {
            title: '60min Hash',
            dataIndex: 'SixtyHash',
            key: '60min Hash',
        },
        {
            title: '24h Hash',
            dataIndex: 'DayHash',
            key: '24h Hash',
        },
        {
            title: 'Status',
            dataIndex: 'State',
            key: 'State',
            render: State => (
                <>
                {
                    State === 'OK' ?  <Tag color={'green'}>OK</Tag> : <Tag color={'volcano'}>DOWN</Tag>
                }
                </>
            )
        },
    ]


    Object.entries(data.workers).map((worker, idx) => {
        return dataSource.push({
            key : idx,
            name : worker[0],
            HashScore: `${(worker[1].hash_rate_scoring / 1000).toFixed(2)}th/s`,
            FiveHash: `${(worker[1].hash_rate_5m / 1000).toFixed(2)}th/s`,
            SixtyHash: `${(worker[1].hash_rate_60m / 1000).toFixed(2)}th/s`,
            DayHash: `${(worker[1].hash_rate_24h / 1000).toFixed(2)}th/s`,
            State: worker[1].state
            
        })
    })

    return (
        <Layout>
            {
                isLoading ? <Spin /> 
                : 
                <Table dataSource={dataSource} columns={columns} />
            }
        </Layout>
    )
}

export default Workers
