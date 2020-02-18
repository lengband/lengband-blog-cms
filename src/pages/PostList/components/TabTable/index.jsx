/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Tab, Message, Button } from '@alifd/next';
import IceLabel from '@icedesign/label';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import { request } from '@/utils/request';
import { api } from '@/utils/api';

const TabPane = Tab.Item;

const tabs = [
  { tab: '全部', key: 'all' },
  { tab: '已发布', key: 'released' },
  { tab: '待发布', key: 'review' },
];

function TabTable(props) {
  const [dataSource, setDataSource] = useState({});
  const [tabKey, setTabKey] = useState(tabs[0].key);

  const fetchArticle = async function () {
    try {
      const { data } = await request({
        url: api.getArticleList().url,
      });
      setDataSource({
        [tabKey]: data.data,
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchArticle();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabKey]);

  const handleRemove = async (value, index, record) => {
    try {
      const { url, method } = api.delArticle(record._id);
      await request({
        url,
        method,
      });
      Message.success('操作成功');
      fetchArticle();
    } catch (error) {
      Message.error(`操作失败：${error}`);
    }
  };

  const handleUpdate = async (data, id) => {
    try {
      const { url, method } = api.updateArticle(id);
      await request({
        url,
        method,
        data,
      });
      Message.success('操作成功');
      fetchArticle();
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
  }

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
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (value, index, record) => {
        return (
          <span>
            {
              record.tags.map(tag => (
                <IceLabel key={tag._id} inverse={false} status="primary">{ tag.cn_name }</IceLabel>
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
    },
    {
      title: '浏览量',
      dataIndex: 'view_count',
      key: 'view_count',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (value, index, record) => {
        return (
          <span>
            {/* <EditDialog
              index={index}
              record={record}
              handleUpdate={formData => handleUpdate(formData, record._id)}
            /> */}
            <Button type="primary" onClick={() => pushUpdate(record._id)}>
              编辑
            </Button>
            <DeleteBalloon
              handleRemove={() => handleRemove(value, index, record)}
            />
          </span>
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

export default withRouter(TabTable)
