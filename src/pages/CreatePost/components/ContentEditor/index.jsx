/* eslint-disable */
import React, { useState, useEffect } from 'react';
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import _ from 'lodash'

import styles from './index.module.scss';
import { useRequest, request } from '@/utils/request';
import { api } from '@/utils/api';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const { TextArea } = Input

export default function ContentEditor() {
  let formRef;
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      console.log(code, 'code');
      return hljs.highlightAuto(code).value;
    }
  });
  const [value, setValue] = useState({
    name: '',
    instroduce: '',
    content: '',
    type: '',
    tags: [],
  });
  const [markdownContent, setMarkdownContent] = useState('预览内容') // html内容

  const { response: typeList, request: fetchType } = useRequest({
    url: api.getTypeList(),
  });

  const {  response: tagList, request: fetchTag } = useRequest({
    url: api.getTagList(),
  });

  const formChange = formValue => setValue(formValue);

  const changeContent = (value) => {
    setValue({
      ...value,
      content: value
    })
    const html = marked(value)
    console.log({html, value}, 'html');

    setMarkdownContent(html)
  }

  const handleSubmit = () => {
    formRef.validateAll(async (errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }
      const { data } = await request({
        url: api.addArticle(),
        method: 'post',
        data: values,
     });
     // !!! 未完成
      Message.success('提交成功');
    });
  };

  const editorChange = (...ret) => {
    console.log(ret, 'rr');
  }

  useEffect(() => {
    fetchType();
    fetchTag()
  }, []);

  return (
    <div className="content-editor">
      <IceFormBinderWrapper
        ref={(refInstance) => {
          formRef = refInstance;
        }}
        value={value}
        onChange={formChange}
      >
        <IceContainer>
          <h2 className={styles.name}>添加文章</h2>
          <Form labelAlign="top" className={styles.form}>
            <Row>
              <Col span="11">
                <FormItem label="标题" required>
                  <IceFormBinder name="name" required message="标题必填">
                    <Input placeholder="这里填写文章标题" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="标签" required>
                  <IceFormBinder
                    name="tags"
                    required
                    type="array"
                    message="标签必填支持多个"
                  >
                    <Select
                      style={{ width: '100%' }}
                      mode="multiple"
                      placeholder="请选择分类"
                      dataSource={(_.get(tagList, 'data.data') || []).map(v => ({ value: v._id, label: v.cn_name }))}
                    />
                  </IceFormBinder>
                  <IceFormError name="tags" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="分类" required>
                  <IceFormBinder
                    name="type"
                    required
                    message="分类必填支持多个"
                  >
                    <Select
                      style={{ width: '100%' }}
                      placeholder="请选择分类"
                      dataSource={(_.get(typeList, 'data.data') || []).map(v => ({ value: v._id, label: v.cn_name }))}
                    />
                  </IceFormBinder>
                  <IceFormError
                    name="type"
                    render={(errors) => {
                      console.log('errors', errors);
                      return (
                        <div>
                          <span style={{ color: 'red' }}>
                            {errors.map(item => item.message).join(',')}
                          </span>
                          <span className={styles.mr}>
                            不知道选择什么分类？请
                            {' '}
                            <a href="#">点击这里</a>
                            {' '}
                            查看
                          </span>
                        </div>
                      );
                    }}
                  />
                </FormItem>
              </Col>
            </Row>
            <FormItem label="描述">
              <IceFormBinder name="instroduce">
                <Input.TextArea placeholder="这里填写正文描述" />
              </IceFormBinder>
            </FormItem>
            <FormItem label="正文" required>
              <IceFormBinder name="content">
                <TextArea
                value={value.content}
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章内容"
              />
              </IceFormBinder>
            </FormItem>
            <FormItem>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }} />
            </FormItem>
            <FormItem label=" ">
              <Button type="primary" onClick={handleSubmit}>
                发布文章
              </Button>
            </FormItem>
          </Form>
        </IceContainer>
      </IceFormBinderWrapper>
    </div>
  );
}
