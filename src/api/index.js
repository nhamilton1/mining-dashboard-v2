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
    return res.data.btc.blocks
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
    return res
}