import React, { useState } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Dialog, Button, Input, Grid, Select } from '@alifd/next';
import styles from './index.module.scss';

export default function EditDialog(props) {
  const [visible, setVisible] = useState(false);
  const { index, record, handleUpdate } = props;

  const { Row, Col } = Grid;

  let formRef;

  const [value, setValue] = useState({
    name: '',
    cn_name: '',
    email: '',
    role: null,
  });

  const formChange = formValue => setValue(formValue);

  const onOpen = (index, record) => {
    const initData = {};
    Object.keys(value).forEach(k => {
      initData[k] = record[k];
    });
    setValue(initData);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const validateAllFormField = () => {
    formRef.validateAll(async (errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      handleUpdate(values);
    });
  };

  return (
    <div className={styles.editDialog}>
      <Button type="primary" onClick={() => onOpen(index, record)}>
        编辑
      </Button>
      <Dialog
        className={styles.w}
        visible={visible}
        onOk={validateAllFormField}
        closeable="esc,mask,close"
        onCancel={onClose}
        onClose={onClose}
        title="编辑"
      >
        <IceContainer>
        <IceFormBinderWrapper
          value={value}
          onChange={formChange}
          ref={(form) => {
            formRef = form;
          }}
        >
          <div className={styles.formContent}>
            <Row className={styles.formItem}>
              <Col xxs="6" s="4" className={styles.formLabel}>
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
              <Col xxs="6" s="4" className={styles.formLabel}>
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
              <Col xxs="6" s="4" className={styles.formLabel}>
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
              <Col xxs="6" s="4" className={styles.formLabel}>
                角色：
              </Col>
              <Col xxs="16" s="12" l="10">
                <IceFormBinder name="role">
                  <Select
                    placeholder="请选择..."
                    dataSource={[
                      { label: '管理员', value: 'admin' },
                      { label: '用户', value: 'member' },
                    ]}
                  />
                </IceFormBinder>
              </Col>
            </Row>

          </div>
        </IceFormBinderWrapper>
      </IceContainer>
      </Dialog>
    </div>
  );
}
