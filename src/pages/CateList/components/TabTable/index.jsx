import React, { useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Message } from '@alifd/next';
import _ from 'lodash';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import { useRequest, request } from '@/utils/request';
import { api } from '@/utils/api';

// const MOCK_DATA = [
//   {
//     name: '前端',
//     cn_name: 'frontEnd',
//     post_num: '2',
//   },
//   {
//     name: '后端',
//     cn_name: 'backEnd',
//     post_num: '3',
//   },
//   {
//     name: '开发工具',
//     cn_name: 'tool',
//     post_num: '10',
//   },
//   {
//     name: '数据库',
//     cn_name: 'database',
//     post_num: '26',
//   },
//   {
//     name: '系统',
//     cn_name: 'system',
//     post_num: '18',
//   },
//   {
//     name: '服务器',
//     cn_name: 'server',
//     post_num: '6',
//   },
//   {
//     name: '框架',
//     cn_name: 'framework',
//     post_num: '39',
//   },
//   {
//     name: '其他',
//     cn_name: 'other',
//     post_num: '52',
//   },
// ];

export default function TabTable() {
  const { response: typeList, request: fetchType } = useRequest({
    url: api.getTypeList().url,
  });

  useEffect(() => {
    fetchType();
  }, []);

  const handleRemove = async (value, index, record) => {
    const { url, method } = api.delType(record._id);
    await request({
      url,
      method,
    });
    Message.success('操作成功');
    fetchType();
  };

  const handleUpdate = async (data, id) => {
    const { url, method } = api.updateType(id);
    await request({
      url,
      method,
      data,
    });
    Message.success('操作成功');
    fetchType();
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '缩写名',
      dataIndex: 'cn_name',
      key: 'cn_name',
      width: 150,
    },
    {
      title: '文章数',
      width: 150,
      dataIndex: 'post_num',
      key: 'post_num',
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
              handleUpdate={(formData) => handleUpdate(formData, record._id)}
            />
            <DeleteBalloon
              disabled={!!record.post_num}
              handleRemove={() => handleRemove(value, index, record)}
            />
          </span>
        );
      },
    },
  ];

  const dataSource = _.get(typeList, 'data.data');

  return (
    <div className="tab-table">
      <IceContainer>
        <CustomTable
          dataSource={dataSource}
          columns={columns}
          hasBorder={false}
        />
      </IceContainer>
    </div>
  );
}
