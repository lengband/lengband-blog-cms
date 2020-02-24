import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link } from 'react-router-dom';
import marked from 'marked';
import hljs from "highlight.js";
// highlight.js 样式demo：https://highlightjs.org/static/demo/
import 'highlight.js/styles/github.css';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select, Message, Upload, Icon } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IcePanel from '@icedesign/panel';
import _ from 'lodash';

import Markdown from './Markdown';
import styles from './index.module.scss';
import { useRequest, request } from '@/utils/request';
import { api, baseURL } from '@/utils/api';
import { getToken } from '@/utils/auth';

const { Row, Col } = Grid;
const FormItem = Form.Item;

function ContentEditor(props) {
  let formRef;
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer,
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    highlight (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  const updatePostId = props.match.params.id;
  const uploadRef = useRef();

  const [uploadPostId, updateUploadPostId] = useState(null);

  const [value, setValue] = useState({
    name: '',
    introduce: '',
    content: '',
    type: '',
    tags: [],
    cover: [],
  });
  const [markdownContent, setMarkdownContent] = useState('预览内容'); // html内容

  const { response: typeList, request: fetchType } = useRequest({
    url: api.getTypeList().url,
  });

  const {  response: tagList, request: fetchTag } = useRequest({
    url: api.getTagList().url,
  });

  const formChange = formValue => setValue(formValue);

  const setPreviewContent = value => {
    const html = marked(value);
    setMarkdownContent(html);
  };

  const fetchPost = async id => {
    const { url, method } = api.getPostById(id);
    try {
      const { data } = await request({
        url,
        method,
     });
      setValue({
        name: data.name,
        introduce: data.introduce,
        content: data.content,
        type: data.type._id,
        tags: data.tags,
        cover: data.cover ? [{
          url: data.cover,
          name: '',
          state: 'done',
        }] : [],
      });
      setPreviewContent(data.content);
    } catch (error) {
      throw error;
    }
  };

  const changeContent = content => {
    setValue({
      ...value,
      content,
    });
    setPreviewContent(content);
  };

  const beforeUpload = () => {
    const token = getToken();
    const config = {
      headers: {},
      data: {
        id: uploadPostId,
      },
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  const uploadCover = async () => {
    const ref = uploadRef.current.getInstance();
    await ref.startUpload();
    return true;
  };

  const extraRender = file => {
    const onClick = () => {
      window.open(file.url);
    };
    return (<Button type="secondary" className="ml-5" size="small" onClick={onClick}><Icon type="picture" />查看封面</Button>);
  };

  const createPost = async (values) => {
    const { url, method } = api.addPost();
    const data = _.cloneDeep(values);
    delete data.cover;
    const { data: postRes } = await request({
      url,
      method,
      data,
    });
    updateUploadPostId(postRes._id);
    await uploadCover(values.cover);
    return true;
  };

  const updatePost = async (values) => {
    const { url, method } = api.updatePost(updatePostId);
    const data = _.cloneDeep(values);
    delete data.cover;
    await request({
      url,
      method,
      data,
    });
    updateUploadPostId(updatePostId);
    await uploadCover(values.cover);
    return true;
  };

  const handleSubmit = () => {
    formRef.validateAll(async (errors, values) => {
      if (errors) {
        return false;
      }
      if (updatePostId) {
        await updatePost(values);
      } else {
        await createPost(values);
      }
      Message.success('提交成功');
      props.history.push('/post/list');
    });
  };

  useEffect(() => {
    fetchType();
    fetchTag();
    if (updatePostId) {
      fetchPost(updatePostId);
    }
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
                      return (
                        <div>
                          <span style={{ color: 'red' }}>
                            {errors.map(item => item.message).join(',')}
                          </span>
                          <span className={styles.mr}>
                            不知道选择什么分类？请
                            {' '}
                            <Link to="/cate/list">点击这里</Link>
                            {' '}
                            查看
                          </span>
                        </div>
                      );
                    }}
                  />
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="封面">
                  <IceFormBinder name="cover">
                    <Upload.Card
                      listType={updatePostId ? 'image' : 'card'}
                      extraRender={extraRender}
                      limit={1}
                      autoUpload={false}
                      beforeUpload={beforeUpload}
                      action={`${window.location.origin}${baseURL}/post/${uploadPostId}/upload`}
                      ref={uploadRef}
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                    />
                  </IceFormBinder>
                </FormItem>
              </Col>
            </Row>
            <FormItem label="简介">
              <IceFormBinder name="introduce">
                <Input.TextArea placeholder="这里填写正文简介" />
              </IceFormBinder>
            </FormItem>
            <FormItem label="正文" required>
              <IceFormBinder name="content" required message="请填写文章内容">
                <Markdown value={value.content} changeContent={changeContent} />
              </IceFormBinder>
              <IceFormError name="content" />
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={handleSubmit}>
                发布文章
              </Button>
            </FormItem>
            <FormItem className="pt-3">
              <IcePanel status="info" style={{marginBottom: '10px'}}>
                <IcePanel.Header>
                  预览
                </IcePanel.Header>
                <IcePanel.Body>
                  <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
                </IcePanel.Body>
              </IcePanel>
            </FormItem>
          </Form>
        </IceContainer>
      </IceFormBinderWrapper>
    </div>
  );
}

export default withRouter(ContentEditor);
