import React, { useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Message } from '@alifd/next';
import IceLabel from '@icedesign/label';
import _ from 'lodash';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import { useRequest, request } from '@/utils/request';
import { api } from '@/utils/api';
import { tagTypeOpts } from '@/constants';

export default function TabTable() {
  const { response: tagList, request: fetchTag } = useRequest({
    url: api.getTagList().url,
  });

  useEffect(() => {
    fetchTag();
  }, []);

  const handleRemove = async (value, index, record) => {
    const { url, method } = api.delTag(record._id);
    await request({
      url,
      method,
    });
    Message.success('操作成功');
    fetchTag();
  };

  const handleUpdate = async (data, id) => {
    const { url, method } = api.updateTag(id);
    await request({
      url,
      method,
      data,
    });
    Message.success('操作成功');
    fetchTag();
  };

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
      title: '标签类型',
      dataIndex: 'tag_status',
      key: 'tag_status',
      render: (value, index, record) => {
        const tagItem = tagTypeOpts.find(val => val.value === record.tag_status);
        if (!tagItem) return '-';
        return (
          <span>
            <IceLabel inverse={false} status={tagItem.value}>{tagItem.label}</IceLabel>
          </span>
        );
      },
    },
    {
      title: '文章数',
      dataIndex: 'post_num',
      key: 'post_num',
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

  const dataSource = _.get(tagList, 'data.data');

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
