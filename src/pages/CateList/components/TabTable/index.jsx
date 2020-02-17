/* eslint-disable */

import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import { useRequest } from '@/utils/request';
import { api } from '@/utils/api';
import _ from 'lodash'

const MOCK_DATA = [
  {
    name: '前端',
    cn_name: 'frontEnd',
    article_num: '2',
  },
  {
    name: '后端',
    cn_name: 'backEnd',
    article_num: '3',
  },
  {
    name: '开发工具',
    cn_name: 'tool',
    article_num: '10',
  },
  {
    name: '数据库',
    cn_name: 'database',
    article_num: '26',
  },
  {
    name: '系统',
    cn_name: 'system',
    article_num: '18',
  },
  {
    name: '服务器',
    cn_name: 'server',
    article_num: '6',
  },
  {
    name: '框架',
    cn_name: 'framework',
    article_num: '39',
  },
  {
    name: '其他',
    cn_name: 'other',
    article_num: '52',
  },
];

export default function TabTable() {
  // const [dataSource, setDataSource] = useState(MOCK_DATA);
  const { response: typeList, request: fetchType } = useRequest({
    url: api.getTypeList(),
  });

  useEffect(() => {
    fetchType();
  }, []);

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
      dataIndex: 'article_num',
      key: 'article_num',
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

  const dataSource = _.get(typeList, 'data.data')

  function getFormValues(dataIndex, values) {
    // dataSource[dataIndex] = values;
    // setDataSource([...dataSource]);
  }

  function handleRemove(value, index) {
    // dataSource.splice(index, 1);
    // setDataSource([...dataSource]);
  }

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
