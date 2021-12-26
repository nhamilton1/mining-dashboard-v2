import React from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { fetchDailyRewards } from '../api'
import { Skeleton, Typography } from 'antd'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'


const DailyRewards = () => {
    const { data, isLoading } = useQuery('fetchDailyRewards', fetchDailyRewards)

    if(isLoading){
        return <Skeleton/>
    }

    const dailyRewards = []
    const dailyRewardsDate = []

    data.map(block =>  dailyRewards.push(Math.floor((block.total_reward*100000000))))
    data.map(date => dailyRewardsDate.push(moment.unix(date.date).format('MMM Do')))

    const formattedData = dailyRewards.map((price, idx) => {
        const date = dailyRewardsDate[idx]
        return { Sats: price, date }
    })


    return (
        <div>
            <Typography.Title style={{ fontSize: '1.5rem' }}>Daily Rewards</Typography.Title>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={formattedData} margin={{ top: 10, right: 15, left: 20, bottom: 5 }}>
                    <Line name="sats" type="monotone" dataKey="Sats" stroke="#8884d8" animationEasing='ease-in'/>
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickCount={10} />
                    <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: '#fff' }} itemStyle={{ color: '#fff' }} cursor={false} formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <CartesianGrid opacity={0.1} vertical={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DailyRewards
