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
    name: 'React Native',
    shortName: 'RN',
    articleNum: '2',
  },
  {
    name: 'JavaScript',
    shortName: 'JS',
    articleNum: '3',
  },
  {
    name: 'HTML5',
    shortName: 'H5',
    articleNum: '10',
  },
  {
    name: 'Ruby on rails',
    shortName: 'ROR',
    articleNum: '26',
  },
  {
    name: 'Android',
    shortName: 'Android',
    articleNum: '18',
  },
  {
    name: 'iOS',
    shortName: 'iOS',
    articleNum: '6',
  },
  {
    name: 'Objective-C',
    shortName: 'Obj-C',
    articleNum: '39',
  },
  {
    name: 'CSS',
    shortName: 'CSS',
    articleNum: '52',
  },
  {
    name: 'Node.js',
    shortName: 'Node.js',
    articleNum: '52',
  },
  {
    name: 'CoffeeScript',
    shortName: 'CoffeeScript',
    articleNum: '52',
  },
];

export default function TabTable() {
  // const [dataSource, setDataSource] = useState(MOCK_DATA);
  const { response: tagList, request: fetchTag } = useRequest({
    url: api.getTagList(),
  });

  useEffect(() => {
    fetchTag();
  }, []);
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '缩写名',
      dataIndex: 'cn_name',
      key: 'cn_name',
    },
    {
      title: '文章数',
      dataIndex: 'article_num',
      key: 'article_num',
      width: 200,
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

  const dataSource = _.get(tagList, 'data.data')

  const getFormValues = (dataIndex, values) => {
    // `dataSource`[dataIndex] = values;
    // setDataSource([...dataSource]);
  };

  const handleRemove = (value, index) => {
    // dataSource.splice(index, 1);
    // setDataSource([...dataSource]);
  };

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
