import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { enquireScreen } from 'enquire-js';
import { Balloon, Icon, Grid } from '@alifd/next';
import styles from './index.module.scss';

const { Row, Col } = Grid;

const dataSource = [
  {
    text: '昨日浏览次数',
    number: '0',
    imgUrl: require('./images/TB1tlVMcgmTBuNjy1XbXXaMrVXa-140-140.png'),
    desc: '相关说明',
  },
  {
    text: '总访问数',
    number: '0',
    imgUrl: require('./images//TB1Py4_ceuSBuNjy1XcXXcYjFXa-142-140.png'),
    desc: '相关说明',
  },
  {
    text: '总访问IP数',
    number: '0',
    imgUrl: require('./images/TB1Ni4_ceuSBuNjy1XcXXcYjFXa-142-140.png'),
    desc: '相关说明',
  },
  {
    text: '总收入数',
    number: '0',
    imgUrl: require('./images/TB1iFKccamWBuNjy1XaXXXCbXXa-140-140.png'),
    desc: '相关说明',
  },
];

export default function StatisticalCard() {
  const [isMobile, setIsMobile] = useState(false);

  const enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';
    enquireScreen((mobile) => {
      setIsMobile(mobile);
    }, mediaCondition);
  };

  useEffect(() => {
    enquireScreenRegister();
  }, []);

  const renderItem = () => {
    const itemStyle = isMobile ? { justifyContent: 'left' } : {};
    return dataSource.map((data, idx) => {
      return (
        <Col xxs="24" s="12" l="6" key={idx}>
          <div className={styles.statisticalCardItem} style={itemStyle}>
            <div className={styles.circleWrap}>
              <img src={data.imgUrl} className={styles.imgStyle} alt="图片" />
            </div>
            <div className={styles.statisticalCardDesc}>
              <div className={styles.statisticalCardText}>
                {data.text}
                <Balloon
                  align="t"
                  alignEdge
                  trigger={(
                    <span>
                      <Icon type="help" className={styles.helpIcon} size="xs" />
                    </span>
)}
                  closable={false}
                >
                  {data.desc}
                </Balloon>
              </div>
              <div className={styles.statisticalCardNumber}>{data.number}</div>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <IceContainer className={styles.container}>
      <Row wrap>{renderItem()}</Row>
    </IceContainer>
  );
}
