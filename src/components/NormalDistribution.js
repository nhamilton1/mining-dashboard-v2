import { Typography } from 'antd'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import {fetchSlushPoolBlockCounterPerDay, fetchPoolBlockCounterPerDay } from '../api'
import _ from 'lodash'
import { Select } from 'antd';

const { Option } = Select;

const style = {
  margin: '0px', 
  padding: '10px', 
  backgroundColor: 'rgb(255, 255, 255)', 
  border: '1px solid rgb(204, 204, 204)', 
  whiteSpace: 'nowrap', 
  darkreader: 'inline', 
}

const NormalDistribution = () => {

    const [poolName, setPoolName] = useState('SlushPool')

    const { data: slushPoolBlockPerDay, isLoading: slushPoolBlockPerDayLoading } = useQuery('fetchSlushPoolBlockCounterPerDay', fetchSlushPoolBlockCounterPerDay, 
        {
            refetchOnWindowFocus: false,
            staleTime: Infinity
        })

    const { data: poolBlockCounterPerDay,  isLoading } = useQuery(["fetchPoolBlockCounterPerDay", poolName], fetchPoolBlockCounterPerDay,
        {
            refetchOnWindowFocus: false,
        })
    
    if(slushPoolBlockPerDayLoading) {
      return <span></span>
    }
    if(isLoading){
      return <span/>
    }

    const dataPoints = Object.values(poolBlockCounterPerDay).sort((a,b)=> a-b)

    const lowerBound = Math.min(...dataPoints), upperBound = Math.max(...dataPoints);

    const getMean = (lowerBound, upperBound) => (upperBound + lowerBound) / 2;

    const getStdDeviation = (lowerBound, upperBound) => (upperBound - lowerBound) / 4;

    const zScore = x => Number(((x - mean)/stdDev).toFixed(2))

    const generatePoints = (lowerBound, upperBound) => {
      let stdDev = getStdDeviation(lowerBound, upperBound); 
      let min = 0
      let max = upperBound + 2 * stdDev;
      let unit = (max - min) / 100;
      return _.range(min, max, unit);
    }

    let mean = getMean(lowerBound, upperBound);
    let stdDev = getStdDeviation(lowerBound, upperBound);
    let points = generatePoints(lowerBound, upperBound);
    let removeDupes = [...new Set(points.map(x => Number(x.toFixed(0))))]
    
    const GetZPercent = (z) => {
      // z == number of standard deviations from the mean
      // if z is greater than 6.5 standard deviations from the mean the
      // number of significant digits will be outside of a reasonable range
      if (z < -6.5) {
        return 0.0;
      }
      if (z > 6.5) {
        return 1.0;
      }
      let factK = 1, sum =0, term = 1, k = 0
      let loopStop = Math.exp(-23);
    
      while(Math.abs(term) > loopStop) {
        term = .3989422804 * Math.pow(-1,k) * Math.pow(z,k) / (2 * k + 1) / Math.pow(2,k) * Math.pow(z,k+1) / factK;
        sum += term;
        k++;
        factK *= k;
      }
      sum += 0.5;
      return sum;
    }

    const GetNewZPercent = (z) => {
      if (z < -6.5) {
        return 0.0;
      }
      if (z > 6.5) {
        return 1.0;
      }
      let factK = 1, sum =0, term = 1, k = 0
      let loopStop = Math.exp(-23);
    
      while(Math.abs(term) > loopStop) {
        term = .3989422804 * Math.pow(-1,k) * Math.pow(z,k) / (2 * k + 1) / Math.pow(2,k) * Math.pow(z,k+1) / factK;
        sum += term;
        k++;
        factK *= k;
      }
      sum += 0.5;
      if(sum > .5) {
        return ((1 - sum)*100)
      } else {
        return sum*100;
      }
    }

    let data = removeDupes.map(x => ({ x, y: zScore(x), z: GetZPercent(zScore(x))}));
    let newDataSet = removeDupes.map(x => ({ x, y: zScore(x), z: GetNewZPercent(zScore(x))}));

    const renderToolTip = (props) =>{
      if(props.active){
        return (
          <div>
            {
              props.payload[0].payload['y'] < 0 
              
              ? 

              <div className='recharts-default-tooltip' style={style}>
                {`${props.payload[0].payload['z'].toFixed(3)}% to get ${props.payload[0].payload['x']} or less blocks  `}
              </div>

              : props.payload[0].payload['y'] > 0
              
              ?

              <div className='recharts-default-tooltip' style={style}>
                {`${props.payload[0].payload['z'].toFixed(3)}% to get ${props.payload[0].payload['x']} or more blocks  `}
              </div>

              :

              <div className='recharts-default-tooltip' style={style}>
                {`${props.payload[0].payload['z']}% to get ${props.payload[0].payload['x']} blocks  `}
              </div>
              
            }
          </div>
        )
      }
      return null
    }

    const pools = [ 'SlushPool', 'F2Pool', 'ViaBTC', 'Poolin', 'AntPool', 'Luxor', 'Foundry USA', 'Binance Pool', 'BTC.com', 'MARA Pool', 'SBI Crypto']

    return (
        <div>
            <Typography.Title style={{ fontSize: '1.5rem' }}>Normal Distribution</Typography.Title>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart width={520} height={200} data={newDataSet} >
                <Area dataKey="z" fill="#ffaa15" name='z' animationEasing='ease-in' type='monotone'/>
                <XAxis dataKey="x" allowDuplicatedCategory={false} orientation='top' scale='band' xAxisId={0} />
                <YAxis />
                <Tooltip content={renderToolTip}/>
                <CartesianGrid opacity={0.1} vertical={false} />
              </AreaChart>
            </ResponsiveContainer>
            <Typography.Title style={{ fontSize: '1.5rem' }}>Cumulative Normal Distribution</Typography.Title>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart width={520} height={200} data={data} >
                <Area dataKey="z" fill="#ffaa15" name='z' animationEasing='ease-in' type='monotone'/>
                <XAxis dataKey="x" allowDuplicatedCategory={false} orientation='bottom' scale='band' xAxisId={0}/>
                <YAxis />
                <Tooltip labelFormatter={(x) => `${x} blocks`} />
                <CartesianGrid opacity={0.1} vertical={false} />
              </AreaChart>
            </ResponsiveContainer>
            <Select defaultValue={poolName} style={{ width: 120, color: 'white' }} onChange={e => setPoolName(e)}>
              {
                pools.map((poolName, idx) => <Option key={idx} value={poolName.replace(' ', '+')}>{poolName}</Option>)
              }
            </Select>
        </div>
    )
}



export default NormalDistribution
