import React, { useState } from 'react';
import IceContainer from '@icedesign/container';
import { withRouter } from 'react-router';
import { Input, Grid, Button, Select, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { request } from '@/utils/request';
import styles from './index.module.scss';
import { api } from '@/utils/api';
import { ROUTER_BASE_PATH } from '@/constants';

const { Row, Col } = Grid;
const Toast = Message;

function UserForm(props) {
  const [value, setValue] = useState({
    name: '',
    cn_name: '',
    email: '',
    role: null,
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

  const formChange = formValue => setValue(formValue);

  const validateAllFormField = () => {
    formRef.validateAll(async (errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      const { url, method } = api.addUser();
      await request({
        url,
        method,
        data: values,
     });
      Toast.success('添加成功');
      props.history.push(`${ROUTER_BASE_PATH}/users/list`);
    });
  };

  return (
    <div className="userForm">
      <IceContainer>
        <IceFormBinderWrapper
          value={value}
          onChange={formChange}
          ref={(form) => {
            formRef = form;
          }}
        >
          <div className={styles.formContent}>
            <h2 className={styles.formTitle}>添加用户</h2>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.formLabel}>
                用户名：
              </Col>
              <Col xxs="16" s="12" l="10">
                <IceFormBinder name="name" required message="必填">
                  <Input placeholder="请输入用户名" />
                </IceFormBinder>
                <IceFormError name="name" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.formLabel}>
                昵称：
              </Col>
              <Col xxs="16" s="12" l="10">
                <IceFormBinder name="cn_name">
                  <Input placeholder="请输入昵称" />
                </IceFormBinder>
                <IceFormError name="cn_name" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.formLabel}>
                邮箱：
              </Col>
              <Col xxs="16" s="12" l="10">
                <IceFormBinder
                  type="email"
                  name="email"
                  required
                  message="请输入正确的邮箱"
                >
                  <Input placeholder="lengband@163.com" />
                </IceFormBinder>
                <IceFormError name="email" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.formLabel}>
                角色：
              </Col>
              <Col xxs="16" s="12" l="10">
                <IceFormBinder name="role">
                  <Select
                    placeholder="请选择..."
                    dataSource={[
                      { label: '管理员', value: 'admin' },
                      { label: '用户', value: 'user' },
                    ]}
                  />
                </IceFormBinder>
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.formLabel}>
                新密码：
              </Col>
              <Col xxs="16" s="12" l="10">
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
              <Col xxs="16" s="12" l="10">
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

export default withRouter(UserForm);
