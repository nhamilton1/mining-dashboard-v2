import React from 'react';
import Workers from './Workers';
import GeneralInfo from './GeneralInfo';
import DailyRewards from './DailyRewards';
import Layout, { Content } from 'antd/lib/layout/layout';

const Dashboard = () => {
  return (
    <Layout>
      <Content style={{margin: '1vh 2vw 1vh 2vw'}}>
        <GeneralInfo />
        <DailyRewards />
        <Workers />
      </Content>
    </Layout>
  );
};

export default Dashboard;
