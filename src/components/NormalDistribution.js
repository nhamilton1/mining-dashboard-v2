import { Skeleton } from 'antd'
import moment from 'moment'
import React from 'react'
import { useQuery } from 'react-query'
import { fetchPoolStats, fetchGlobalHashrate, fetchAvg30DayGlobalHash } from '../api'


const NormalDistribution = () => {

    // z = (blocks mined in a day - average amount of blocks(percentage of poolhash * 144))/ 2 month average

    const { data: poolStats, isLoading: poolStatsIsLoading } = useQuery('fetchPoolStats', fetchPoolStats, 
        {
            refetchInterval: 60000, 
            refetchIntervalInBackground: 60000
        })

    const { data: globalHash, isLoading: globalHashLoading } = useQuery('fetchGlobalHashrate', fetchGlobalHashrate)
    const { data: avgGlobalHash, isLoading: avgPoolHashLoading } = useQuery('fetchAvg30DayGlobalHash', fetchAvg30DayGlobalHash, 
        {
            staleTime: Infinity
        })

    if(poolStatsIsLoading) {
      return <Skeleton/>
    }

    if(globalHashLoading) {
        return <Skeleton/>
    }

    if(avgPoolHashLoading) {
        return <Skeleton/>
    }
    
    
    function findsBlocksMined(dateFound, sub) {
      sub = sub.toLowerCase()
      return dateFound.map(str => str
        .toLowerCase()
        .startsWith(sub.slice(0, Math.max(str.length - 1, 1)))
      );
    }
    
    const results = findsBlocksMined(Object.entries(poolStats.blocks).map(blocks => moment.unix(blocks[1].date_found).format('MMM Do , h:mm a')), moment().format('MMM Do'))
    let numOfblocks = results.filter(x => x === true).length
    let expectedAverage = ((poolStats.pool_scoring_hash_rate)/globalHash)*144
    // let standardDiv = ()
    console.log(avgGlobalHash.hash_rate_30)


    return (
        <div>
            
        </div>
    )
}

export default NormalDistribution
