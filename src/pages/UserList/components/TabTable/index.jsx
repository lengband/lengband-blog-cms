import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import axios from 'axios';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';

export default function TabTable() {
  const [dataSource, setDataSource] = useState({});

  const getFormValues = (dataIndex, values) => {
    console.log({ dataIndex, values }, 'getFormValues');
  };

  const handleRemove = (value, index, record) => {
    console.log({ value, index, record }, 'handleRemove');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 100,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 150,
    },
    {
      title: '用户组',
      dataIndex: 'group',
      key: 'group',
      width: 120,
    },
    {
      title: '文章数',
      dataIndex: 'articleNum',
      key: 'articleNum',
      width: 80,
    },
    {
      title: '评论数',
      dataIndex: 'commentNum',
      key: 'commentNum',
      width: 80,
    },
    {
      title: '注册时间',
      dataIndex: 'regTime',
      key: 'regTime',
      width: 150,
    },
    {
      title: '最后登录时间',
      dataIndex: 'LastLoginTime',
      key: 'LastLoginTime',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
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

  useEffect(() => {
    axios
      .get('/mock/user-list.json')
      .then((response) => {
        setDataSource(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="tab-table">
      <IceContainer style={{ padding: '0 20px 20px' }}>
        <CustomTable
          dataSource={dataSource}
          columns={columns}
          hasBorder={false} />
      </IceContainer>
    </div>
  );
}
