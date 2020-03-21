import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import styles from './index.module.scss';
import { request } from '@/utils/request';
import { api } from '@/utils/api';
import { setToken } from '@/utils/auth';
import { ROUTER_BASE_PATH } from '@/constants';

const UserLogin = props => {
  const [value, setValue] = useState({
    name: '',
    password: '',
    remember: true,
  });

  let formRef;

  const formChange = (newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.validateAll(async (errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      const { data } = await request({
        url: api.login(),
        method: 'post',
        data: values,
     });
     setToken(data.token);
      Message.success('登录成功');
      props.history.push(ROUTER_BASE_PATH);
    });
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    // removeToken();
  }, []);

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>登 录</h4>
      <IceFormBinderWrapper
        value={value}
        onChange={formChange}
        ref={form => formRef = form}
      >
        <div className={styles.formItems}>
          <div className={styles.formItem}>
            <IceIcon type="person" size="small" className={styles.inputIcon} />
            <IceFormBinder name="name" required message="必填">
              <Input
                size="large"
                maxLength={20}
                placeholder="用户名"
                className={styles.inputCol}
                onKeyDown={onKeyDown}
              />
            </IceFormBinder>
            <IceFormError name="name" />
          </div>

          <div className={styles.formItem}>
            <IceIcon type="lock" size="small" className={styles.inputIcon} />
            <IceFormBinder name="password" required message="必填">
              <Input
                size="large"
                htmlType="password"
                placeholder="密码"
                className={styles.inputCol}
                onPressEnter={handleSubmit}
                onKeyDown={onKeyDown}
              />
            </IceFormBinder>
            <IceFormError name="password" />
          </div>

          <div className={styles.formItem}>
            <IceFormBinder name="remember" valuePropName="checked">
              <Checkbox className={styles.checkbox}>记住账号</Checkbox>
            </IceFormBinder>
          </div>

          <div className={styles.footer}>
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              className={styles.submitBtn}
            >
              登 录
            </Button>
            <Link to={`${ROUTER_BASE_PATH  }/user/register`} className={styles.tips}>
              立即注册
            </Link>
          </div>
        </div>
      </IceFormBinderWrapper>
    </div>
  );
};

export default withRouter(UserLogin);
