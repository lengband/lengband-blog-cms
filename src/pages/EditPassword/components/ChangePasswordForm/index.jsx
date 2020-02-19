import React, { useState } from 'react';
import IceContainer from '@icedesign/container';
import { withRouter } from 'react-router';
import { Input, Grid, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import stores from '@/stores';
import { api } from '@/utils/api';
import { request } from '@/utils/request';
import styles from './index.module.scss';

const { Row, Col } = Grid;
const Toast = Message;

function ChangePasswordForm(props) {
  const user = stores.useStore('user');
  const [value, setValue] = useState({
    password: '',
    rePasswd: '',
  });

  let formRef;
  const checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  const checkPasswd2 = (rule, values, callback, stateValues) => {
    if (values && values !== stateValues.password) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  const getUserId = () => {
    let id = user.userInfo._id;
    if (props.match.params.id) {
      id = props.match.params.id;
    }
    return id;
  };

  const formChange = formValue => setValue(formValue);

  const validateAllFormField = () => {
    formRef.validateAll(async (errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      const id = getUserId();
      const { url, method } = api.updateUser(id);
      await request({
        url,
        method,
        data: { password: values.password },
      });
      Toast.success('修改成功');
      if (!props.match.params.id) {
        props.history.push('/user/login');
      }
    });
  };

  return (
    <div className={styles.changePasswordForm}>
      <IceContainer>
        <IceFormBinderWrapper
          value={value}
          onChange={formChange}
          ref={(form) => {
            formRef = form;
          }}
        >
          <div className={styles.formContent}>
            <h2 className={styles.formTitle}>修改密码</h2>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.formLabel}>
                新密码：
              </Col>
              <Col xxs="16" s="10" l="6">
                <IceFormBinder
                  name="password"
                  required
                  validator={checkPasswd}
                >
                  <Input
                    htmlType="password"
                    placeholder="请重新输入新密码"
                  />
                </IceFormBinder>
                <IceFormError name="password" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.formLabel}>
                确认密码：
              </Col>
              <Col xxs="16" s="10" l="6">
                <IceFormBinder
                  name="rePasswd"
                  required
                  validator={(rule, values, callback) => checkPasswd2(
                    rule,
                    values,
                    callback,
                    value
                  )
                  }
                >
                  <Input
                    htmlType="password"
                    placeholder="两次输入密码保持一致"
                    onPressEnter={validateAllFormField}
                  />
                </IceFormBinder>
                <IceFormError name="rePasswd" />
              </Col>
            </Row>
          </div>
        </IceFormBinderWrapper>

        <Row style={{ marginTop: 20 }}>
          <Col offset="3">
            <Button
              type="primary"
              onClick={validateAllFormField}
            >
              提 交
            </Button>
          </Col>
        </Row>
      </IceContainer>
    </div>
  );
}

export default withRouter(ChangePasswordForm);
