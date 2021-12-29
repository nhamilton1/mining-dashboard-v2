import React from 'react'
import { useQuery } from 'react-query'
import { fetchSlushPoolBlockCounterPerDay } from '../api'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import _ from 'lodash'
import bellcurve from 'highcharts/modules/histogram-bellcurve';
bellcurve(Highcharts)


const NormalDistribution = () => {

    const { data: slushPoolBlockPerDay, isLoading: slushPoolBlockPerDayLoading } = useQuery('fetchSlushPoolBlockCounterPerDay', fetchSlushPoolBlockCounterPerDay, 
        {
            staleTime: Infinity
        })

    if(slushPoolBlockPerDayLoading) {
      return <span></span>
    }

    const dataPoints = Object.values(slushPoolBlockPerDay)
    
    // let zScoreMean = ((poolStats.pool_scoring_hash_rate)/(avgGlobalHash.hash_rate_30*1000000000))*144
    // const getStandardDeviation = array => {
    //     const n = array.length
    //     const mean = (array.reduce((a, b) => a + b) / n)
    //     return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    // }
    // const zScore = x => ( x - zScoreMean)/getStandardDeviation(dataPoints)
    
    // let chartData = dataPoints.map(x => ({ x, y: zScore(x)}));

    const lowerBound = Math.min(...dataPoints), upperBound = Math.max(...dataPoints);

    const normalY = (x, mean, stdDev) => Math.exp((-0.5) * Math.pow((x - mean) / stdDev, 2));

    const getMean = (lowerBound, upperBound) => (upperBound + lowerBound) / 2;

    const getStdDeviation = (lowerBound, upperBound) => (upperBound - lowerBound) / 4;


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


    let seriesData = points.map(x => ({ x: Number(x.toFixed(0)), y: normalY(x, mean, stdDev)}));


    const options = {

      chart: {
        type: 'area',
        margin: [50, 0, 50, 50],
        backgroundColor: {
          linearGradient: [0, 0, 500, 500],
          stops: [
              [0, 'rgb(0,0,0)'],
          ]
        },
      },
      series: [{
        data: seriesData,
      }],
    }


    return (
        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default NormalDistribution
