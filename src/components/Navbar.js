import React from 'react'
import { useQuery } from 'react-query';
import { Layout } from 'antd';
import moment from 'moment';
import { fetchPoolStats } from '../api';
import { Spin } from 'antd';

const { Header } = Layout;

const Navbar = () => {

  const { data: poolStats, isLoading: poolStatsIsLoading } = useQuery('fetchPoolStats', fetchPoolStats)

  if(poolStatsIsLoading) {
    return <Header><Spin /></Header>
  }

  function findsBlocksMined(dateFound, sub) {
    sub = sub.toLowerCase()
    return dateFound.map(str => str
      .toLowerCase()
      .startsWith(sub.slice(0, Math.max(str.length - 1, 1)))
    );
  }

  const results = findsBlocksMined(Object.entries(poolStats).map(blocks => moment.unix(blocks[1].date_found).format('MMM Do , h:mm a')), moment().format('MMM Do'))
  let numOfTrue = results.filter(x => x === true).length

    return (
        <Header className="header">
          <div className="logo" />
            <div>Blocks mined today: {numOfTrue}</div>
        </Header>
    )
}

export default Navbar
