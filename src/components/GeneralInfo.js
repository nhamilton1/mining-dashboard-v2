import { Skeleton, Statistic } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { fetchProfile, fetchPoolStats } from '../api'
import moment from 'moment'

const GeneralInfo = () => {

    const { data, isLoading } = useQuery('fetchProfile', fetchProfile, {refetchInterval: 60000, refetchIntervalInBackground: 60000})
    const { data: poolStats, isLoading: poolStatsIsLoading } = useQuery('fetchPoolStats', fetchPoolStats, {refetchInterval: 60000, refetchIntervalInBackground: 60000})

    if(poolStatsIsLoading) {
      return <Skeleton/>
    }

    if(isLoading) {
        return <Skeleton/>
    }
  
    function findsBlocksMined(dateFound, sub) {
      sub = sub.toLowerCase()
      return dateFound.map(str => str
        .toLowerCase()
        .startsWith(sub.slice(0, Math.max(str.length - 1, 1)))
      );
    }
  
    const results = findsBlocksMined(Object.entries(poolStats).map(blocks => moment.unix(blocks[1].date_found).format('MMM Do , h:mm a')), moment().format('MMM Do'))
    let numOfblocks = results.filter(x => x === true).length
  
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Statistic title="Hash Scoring" value={`${(data.hash_rate_scoring / 1000).toFixed(2)} th/s`}/>
            <Statistic title="Unconfirmed Reward" value={`${new Intl.NumberFormat('en-US').format((data.unconfirmed_reward * 100000000))} 丰`}/>
            <Statistic title="Estimated Reward" value={`${new Intl.NumberFormat('en-US').format((data.estimated_reward * 100000000))} 丰`}/>
            <Statistic title="Confirmed Reward" value={`${new Intl.NumberFormat('en-US').format((data.confirmed_reward * 100000000))} 丰`}/>
            <Statistic title="Yesterday's Hash" value={`${(data.hash_rate_yesterday / 1000).toFixed(2)} th/s`}/>
            <Statistic title="Found today" value={numOfblocks === 1 ? `${numOfblocks} block` : `${numOfblocks} blocks`}/>
        </div>
    )
}

export default GeneralInfo
