import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
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

export default function TabTable() {
  const [dataSource, setDataSource] = useState({});
  const [tabKey, setTabKey] = useState(tabs[0].key);

  useEffect(() => {
    const fetchData = async function () {
      try {
        const { data } = await request({
          url: api.getArticleList(),
        });
        setDataSource({
          [tabKey]: data.data,
        });
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [tabKey]);

  const getFormValues = (dataIndex, values) => {
    dataSource[tabKey][dataIndex] = values;
    setDataSource({ ...dataSource });
  };

  const handleRemove = (value, index) => {
    dataSource[tabKey].splice(index, 1);
    setDataSource({ ...dataSource });
  };

  const handleTabChange = (key) => {
    setTabKey(key);
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
      title: '标签',
      dataIndex: 'tags',
      render: (value, index, record) => {
        console.log({ value, index, record }, 'value, index, record');
        return (
          <span>
            {
              record.tags.map(tag => (
                <IceLabel inverse={false} status="primary">{ tag.cn_name }</IceLabel>
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
            <EditDialog
              index={index}
              record={record}
              getFormValues={getFormValues}
            />
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
