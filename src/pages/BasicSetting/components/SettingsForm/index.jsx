  /* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Button,
  Radio,
  Switch,
  Upload,
  Grid,
  Message,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import _ from 'lodash';
import stores from '@/stores';
import styles from './index.module.scss';
import { request } from '@/utils/request';
import { api, baseURL } from '@/utils/api';
import { getToken } from '@/utils/auth'

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;


export default function SettingsForm() {
  const user = stores.useStore('user');
  const { userInfo: userMsg, fetchUserInfo: updateUserStore } = user;

  const childRef = useRef();

  const [value, setValue] = useState({
    name: '',
    gender: '',
    notice: '',
    email: '',
    avatar: [],
    website: '',
    github: '',
    description: '',
  });

  const fetchUserInfo = async () => {
    const { url, method } = api.getUserInfo(userMsg._id);
    const { data: userInfo } = await request({
      url,
      method,
    });
    setValue({
      name: userInfo.name,
      gender: userInfo.gender,
      notice: userInfo.notice,
      email: userInfo.email,
      avatar: userInfo.avatar ? [{
        url: userInfo.avatar,
        name: '',
        state: 'done',
      }] : [],
      website: userInfo.website,
      github: userInfo.github,
      description: userInfo.description,
    })
  };

  const beforeUpload = () => {
    const token = getToken();
    const config = {
      headers: {}
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config
  }


  const handleUpdate = async (data) => {
    const { url, method } = api.updateUser(userMsg._id);
    await request({
      url,
      method,
      data,
    });
    return true;
  };

  const formRef = React.createRef();

  const uploadAvatar = async avatar => {
    const uploadRef = childRef.current.getInstance();
    await uploadRef.startUpload();
    return true;
  };

  const validateAllFormField = () => {
    formRef.current.validateAll(async (errors, values) => {
      if (errors) {
        return;
      }
      const data = _.cloneDeep(values);
      delete data.avatar;
      await handleUpdate(data);
      await uploadAvatar(values.avatar);
      await updateUserStore()
      Message.success('提交成功');
    });
  };

  useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    <div className={styles.SettingsForm}>
      <IceContainer>
        <IceFormBinderWrapper
          value={value}
          ref={formRef}
        >
          <div className={styles.formContent}>
            <h2 className={styles.formTitle}>基本设置</h2>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.label}>
                姓名：
              </Col>
              <Col xxs="16" s="10" l="6">
                <IceFormBinder name="name" required max={10} message="必填">
                  <Input placeholder="冷板凳" />
                </IceFormBinder>
                <IceFormError name="name" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.label}>
                头像：
              </Col>
              <Col xxs="16" s="10" l="6">
                <IceFormBinder name="avatar">
                  <Upload.Card
                    listType="card"
                    limit={1}
                    autoUpload={false}
                    beforeUpload={beforeUpload}
                    action={`${window.location.origin}${baseURL}/user/upload`}
                    ref={childRef}
                    accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                  />
                </IceFormBinder>
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.label}>
                性别：
              </Col>
              <Col xxs="16" s="10" l="6">
                <IceFormBinder name="gender" required message="必填">
                  <RadioGroup>
                    <Radio value="male">男</Radio>
                    <Radio value="female">女</Radio>
                  </RadioGroup>
                </IceFormBinder>
                <IceFormError name="gender" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.label}>
                通知：
              </Col>
              <Col xxs="16" s="10" l="6">
                <IceFormBinder type="boolean" name="notice">
                  <Switch />
                </IceFormBinder>
                <IceFormError name="notice" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.label}>
                邮件：
              </Col>
              <Col xxs="16" s="10" l="6">
                <IceFormBinder
                  type="email"
                  name="email"
                  required
                  message="请输入正确的邮件"
                >
                  <Input
                    placeholder="ice-admin@alibaba-inc.com"
                  />
                </IceFormBinder>
                <IceFormError name="email" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.label}>
                website ：
              </Col>
              <Col xxs="16" s="10" l="6">
                <IceFormBinder
                  type="url"
                  name="website"
                >
                  <Input
                    type="url"
                    placeholder="https://github.com/lengband"
                  />
                </IceFormBinder>
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.label}>
                Github：
              </Col>
              <Col xxs="16" s="10" l="6">
                <IceFormBinder
                  type="url"
                  name="github"
                >
                  <Input
                    placeholder="https://github.com/lengband"
                  />
                </IceFormBinder>
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="4" l="3" className={styles.label}>
                自我描述：
              </Col>
              <Col xxs="16" s="10" l="6">
                <IceFormBinder name="description">
                  <Input.TextArea placeholder="请输入描述..." />
                </IceFormBinder>
                <IceFormError name="description" />
              </Col>
            </Row>
          </div>
        </IceFormBinderWrapper>

        <Row className={styles.width}>
          <Col offset="3">
            <Button
              type="primary"
              className={styles.width2}
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
