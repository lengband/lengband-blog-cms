/* eslint-disable */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import { useRequest, request } from '@/utils/request';
import { api } from '@/utils/api';

export default function TabTable() {
  const { response: userList, request: fetchUser } = useRequest({
    url: api.getUserList().url,
  });

  const handleRemove = async (value, index, record) => {
    try {
      const { url, method } = api.delUser(record._id);
      await request({
        url,
        method,
      });
      Message.success('操作成功');
      fetchUser();
    } catch (error) {
      Message.error(`操作失败：${error}`);
    }
  };

  const handleUpdate = async (data, id) => {
    try {
      const { url, method } = api.updateUser(id);
      await request({
        url,
        method,
        data,
      });
      Message.success('操作成功');
      fetchUser();
    } catch (error) {
      Message.error(`操作失败：${error}`);
    }
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 100,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 150,
    },
    {
      title: '文章数',
      dataIndex: 'article_num',
      key: 'article_num',
    },
    {
      title: '评论数',
      dataIndex: 'comment_num',
      key: 'comment_num',
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value, index, record) => {
        return moment(record.createdAt).format()
      }
    },
    {
      title: '最后登录时间',
      dataIndex: 'last_login_time',
      key: 'last_login_time',
      render: (value, index, record) => {
        return moment(record.last_login_time).format()
      }
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
              handleUpdate={(formData) => handleUpdate(formData, record._id)}
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
    fetchUser()
  }, []);

  const dataSource = _.get(userList, 'data.data');

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
