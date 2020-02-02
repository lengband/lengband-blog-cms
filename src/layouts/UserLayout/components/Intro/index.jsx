import React from 'react';
import styles from './index.module.scss';

export default () => (
  <div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.description} style={{ 'lineHeight': '20px' }}>lengband</div>
      <div className={styles.title}>博客管理系统</div>
      <p className={styles.description}>支持在线编写发布博客，查看访客等功能</p>
    </div>
  </div>
);
