
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Tab, Message, Button } from '@alifd/next';
import IceLabel from '@icedesign/label';
import moment from 'moment';
import CustomTable from './components/CustomTable';
import DeleteBalloon from './components/DeleteBalloon';
import PublishBalloon from './components/PublishBalloon';
import { request } from '@/utils/request';
import { api } from '@/utils/api';
import styles from './components/index.module.scss';

const TabPane = Tab.Item;

const tabs = [
  { tab: '全部', key: 'all' },
  { tab: '已发布', key: 'released' },
  { tab: '待发布', key: 'review' },
];

function TabTable(props) {
  const [dataSource, setDataSource] = useState({});
  const [tabKey, setTabKey] = useState(tabs[0].key);

  const fetchPost = async function () {
    const params = {};
    if (tabKey === 'released') {
      params.released = true;
    }
    if (tabKey === 'review') {
      params.released = false;
    }
    try {
      const { data } = await request({
        url: api.getPostList().url,
        params,
      });
      setDataSource({
        [tabKey]: data.data,
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchPost();
  }, [tabKey]);

  const handleRemove = async (value, index, record) => {
    try {
      const { url, method } = api.delPost(record._id);
      await request({
        url,
        method,
      });
      Message.success('操作成功');
      fetchPost();
    } catch (error) {
      Message.error(`操作失败：${error}`);
    }
  };

  const handlePublish = async (data, record) => {
    try {
      const { url, method } = api.updatePost(record._id);
      await request({
        url,
        method,
        data,
      });
      Message.success('操作成功');
      fetchPost();
    } catch (error) {
      Message.error(`操作失败：${error}`);
    }
  };

  const handleTabChange = (key) => {
    setTabKey(key);
  };

  const pushUpdate = id => {
    const { history } = props;
    history.push(`/post/update/${id}`);
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类别',
      dataIndex: 'type.cn_name',
      key: 'type.cn_name',
    },
    {
      title: '前言',
      dataIndex: 'introduce',
      key: 'introduce',
      width: 200,
      render: (value, index, record) => {
        return <div className={styles['text-truncate-mutiple-2']}>{ record.introduce }</div>;
      },
    },
    {
      title: '文章封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (value, index, record) => {
        if (!record.cover) return '暂无';
        return (
          <img
            style={{
              verticalAlign: 'middle',
              width: '80px',
            }}
            src={record.cover}
            alt={record.cover}
          />
        );
      },
    },
    {
      title: '是否发布',
      dataIndex: 'released',
      key: 'released',
      render: (value, index, record) => {
        if (record.released) {
          return <IceLabel status="success">已发布</IceLabel>;
        }
        return <IceLabel status="default">未发布</IceLabel>;
      },
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (value, index, record) => {
        return (
          <span>
            {
              record.tags.map(tag => (
                <IceLabel key={tag._id} inverse={false} status={tag.tag_status}>{ tag.cn_name }</IceLabel>
              ))
            }
          </span>
        );
      },
    },
    {
      title: '发布时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value, index, record) => {
        return moment(record.createdAt).format();
      },
    },
    {
      title: '浏览量',
      dataIndex: 'view_count',
      key: 'view_count',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (value, index, record) => {
        return (
          <div className="d-flex justify-content-between">
            <Button type="primary" onClick={() => pushUpdate(record._id)}>
              编辑
            </Button>
            <DeleteBalloon
              disabled={record.released}
              handleRemove={() => handleRemove(value, index, record)}
            />
            <PublishBalloon
              record={record}
              handlePublish={data => handlePublish(data, record)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="tab-table">
      <IceContainer style={{ padding: '0 20px 20px' }}>
        <Tab onChange={handleTabChange}>
          {tabs.map((item) => {
            return (
              <TabPane title={item.tab} key={item.key}>
                <CustomTable
                  dataSource={dataSource[tabKey]}
                  columns={columns}
                  hasBorder={false}
                />
              </TabPane>
            );
          })}
        </Tab>
      </IceContainer>
    </div>
  );
}

export default withRouter(TabTable);
