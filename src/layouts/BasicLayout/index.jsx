import React from 'react';
import Layout from '@icedesign/layout';
import { withRouter } from 'react-router';
import { Message } from '@alifd/next';
import { decodeToken } from '@/utils/auth';

import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import styles from './index.module.scss';

const BasicLayout = props => {
  const token = decodeToken();
  if (!token) {
    props.history.push('/user/login');
    Message.warning('请先登录后重试');
    return false;
  }
  return (
    <div className={styles.iceDesignLayout}>
      <Layout>
        <Header />
        <Layout.Section scrollable>
          <Layout.Aside>
            <Aside />
          </Layout.Aside>
          <Layout.Main>
            { props.children }
          </Layout.Main>
        </Layout.Section>

        <Footer />
      </Layout>
    </div>
  );
};

export default withRouter(BasicLayout);
