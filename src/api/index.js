/* eslint-disable no-unused-vars */
import axios from "axios"

const blockURL = process.env.REACT_APP_BASE_URL + '/pool_block_counter'
const historicURL = process.env.REACT_APP_BASE_URL + '/api/historic_prices'

export const fetchDailyRewards = async () => {
    const res = await axios.get('http://localhost:9000/rewards')
    return res.data.btc.daily_rewards
}

export const fetchDiffAdjust = async () => {
    const res = await axios.get('https://mempool.space/api/v1/difficulty-adjustment')
    return res.data
}

export const fetchGeneral = async () => {
    const res = await axios.get('http://localhost:9000/stats')
    return res.data.btc
}

export const fetchPoolStats = async () => {
    const res = await axios.get('http://localhost:9000/stats')
    return res.data.btc
}

export const fetchProfile = async () => {
    const res = await axios.get('http://localhost:9000/profile')
    return res.data.btc
}

export const fetchWorkers = async () => {
    const res = await axios.get('http://localhost:9000/workers')
    return res.data.btc
}

export const fetchGlobalHashrate = async () => {
    const res = await axios.get('http://localhost:9000/global_hashrate')
    return res.data
}

export const fetchAvg30DayGlobalHash = async () => {
    const res = await axios.get('http://localhost:9000/30day_global_avg')
    return res.data
}

export const fetchSlushPoolBlockCounterPerDay = async () => {
    const res = await axios.get('http://localhost:9000/slushpool_block_counter')
    return res.data.data
}

export const fetchPoolBlockCounterPerDay = async ({ queryKey }) => {
    const [ _, poolName ] = queryKey
    try { 
        const res = await axios.get(blockURL, { params: { pool: poolName } })
        return res.data.data
    } catch (error) { 
        console.log(error) 
    }
}

export const fetchBitcoinPriceRange = async ({ queryKey }) => {
    const [ _, date ] = queryKey
    console.log(date)
    try {
        const res = await axios.get('http://localhost:9000/api/btc_prices', { params: { startDate: date[0], endDate: date[1] }})
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const fetchHistoricPriceRange = async ({ queryKey }) => {
    const [ _, date ] = queryKey
    console.log(date)
    try {
        const res = await axios.get(historicURL, { params: { startDate: date[0], endDate: date[1] }})
        return res.data
    } catch (err) {
        console.log(err)
    }
}