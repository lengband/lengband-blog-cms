import React, { useState } from 'react';
import { Form, Field } from '@ice/form';
import { Dialog, Button, Input } from '@alifd/next';
import styles from './index.module.scss';

export default function EditDialog(props) {
  const [visible, setVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  let handleSubmit = null;

  const onSubmit = (values) => {
    setVisible(false);
    props.handleUpdate(values);
  };

  const onOpen = (index, record) => {
    setInitialValues(record);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const { index, record } = props;

  return (
    <div className={styles.editDialog}>
      <Button type="primary" onClick={() => onOpen(index, record)}>
        编辑
      </Button>
      <Dialog
        className={styles.w}
        visible={visible}
        onOk={e => handleSubmit(e)}
        closeable="esc,mask,close"
        onCancel={onClose}
        onClose={onClose}
        title="编辑"
      >
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          layout={{
            wrapperCol: 10,
          }}
        >
          {(formCore) => {
            handleSubmit = formCore.submit.bind(formCore);
            return (
              <React.Fragment>
                <Field label="用户名：" name="name" component={Input} rules={{ required: true, message: '必填选项' }} />
                <Field label="邮箱：" name="email" component={Input} rules={{ required: true, message: '必填选项' }} />
              </React.Fragment>
            );
          }}
        </Form>
      </Dialog>
    </div>
  );
}
