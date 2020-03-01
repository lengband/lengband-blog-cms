import React, { useState } from 'react';
import { Button, Balloon } from '@alifd/next';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

export default function DeleteBalloon(props) {
  const [visible, setVisible] = useState(false);

  function handleHide(code) {
    if (code === 1) {
      props.handlePublish({ released: !props.record.released });
    }
    setVisible(false);
  }

  function handleVisible(visibleStatus) {
    setVisible(visibleStatus);
  }

  const text = props.record.released ? '下架' : '发布';

  const visibleTrigger = (
    <Button type="secondary" warning>
      { text }
    </Button>
  );

  const content = (
    <div>
      <div className={styles.contentText}>确认{text}？</div>
      <div className="d-flex justify-content-between">
        <Button
          id="confirmBtn"
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={() => handleHide(1)}
        >
          确认
        </Button>
        <Button
          id="cancelBtn"
          onClick={() => handleHide(0)}
        >
          关闭
        </Button>
      </div>
    </div>
  );

  return (
    <Balloon
      trigger={visibleTrigger}
      triggerType="click"
      visible={visible}
      onVisibleChange={handleVisible}
    >
      {content}
    </Balloon>
  );
}

DeleteBalloon.propTypes = {
  handlePublish: PropTypes.func,
};

DeleteBalloon.defaultProps = {
  handlePublish: () => {},
};
