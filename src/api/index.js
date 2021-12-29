import axios from "axios"

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