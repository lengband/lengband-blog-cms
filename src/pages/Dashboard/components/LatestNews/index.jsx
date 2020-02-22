import React, { useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import cx from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import IceEllipsis from '@icedesign/ellipsis';
import { useRequest } from '@/utils/request';
import { api } from '@/utils/api';
import styles from './index.module.scss';

const { Row, Col } = Grid;

export default () => {

  const { response: postList, request: fetchPost } = useRequest({
    url: api.getPostList().url,
  });

  const { response: CommentList, request: fetchComment } = useRequest({
    url: api.getCommentList().url,
  });

  useEffect(() => {
    fetchPost();
    fetchComment();
  }, []);

  // const dataSource = {
  //   posts: [
  //     {
  //       name: '这里是文章的标题1',
  //       updatedAt: '2018-03-31',
  //     },
  //     {
  //       name: '这里是文章的标题2',
  //       updatedAt: '2018-02-02',
  //     },
  //     {
  //       name: '这里是文章的标题3',
  //       updatedAt: '2018-01-22',
  //     },
  //     {
  //       name: '这里是文章的标题4',
  //       updatedAt: '2018-02-02',
  //     },
  //     {
  //       name: '这里是文章的标题5',
  //       updatedAt: '2018-01-22',
  //     },
  //     {
  //       name: '这里是文章的标题6',
  //       updatedAt: '2018-02-02',
  //     },
  //   ],
  //   comments: [
  //     {
  //       name: '这里是最新的评论1',
  //       updatedAt: '2018-02-26',
  //       num: '18',
  //     },
  //     {
  //       name: '这里是最新的评论2',
  //       updatedAt: '2018-01-22',
  //       num: '22',
  //     },
  //     {
  //       name: '这里是最新的评论3',
  //       updatedAt: '2018-01-18',
  //       num: '36',
  //     },
  //     {
  //       name: '这里是最新的评论4',
  //       updatedAt: '2018-01-18',
  //       num: '29',
  //     },
  //   ],
  // };

  const dataSource = {
    posts: _.get(postList, 'data.data') || [],
    comments: _.get(CommentList, 'data.data') || [],
  };

  return (
    <div className={cx(styles.container, styles.latestNews)}>
      <Row wrap gutter="20">
        <Col xxs="24" s="12" l="12">
          <IceContainer className={styles.cardContainer}>
            <h3 className={styles.cardTitle}>
              最新文章
              <a href="#" className={cx(styles.more, 'link')}>
                更多
              </a>
            </h3>
            <div className={styles.items}>
              {dataSource.posts.map((item, index) => {
                return (
                  <a key={index} href="#" className={cx(styles.item, 'link')}>
                    <IceEllipsis lineNumber={1} text={item.name} />
                    <div className={styles.itemTime}>{moment(item.updatedAt).format()}</div>
                  </a>
                );
              })}
            </div>
          </IceContainer>
        </Col>
        <Col xxs="24" s="12" l="12">
          <IceContainer className={styles.cardContainer}>
            <h3 className={styles.cardTitle}>
              最新评论
              <a href="#" className={cx(styles.more, 'link')}>
                更多
              </a>
            </h3>
            <div className={styles.items}>
              {dataSource.comments.map((item, index) => {
                return (
                  <a key={index} href="#" className={cx(styles.item, 'link')}>
                    <div className={styles.itemComment}>
                      <IceEllipsis lineNumber={1} text={item.name} />
                      <div className={styles.commentTime}>{moment(item.updatedAt).format()}</div>
                    </div>
                    <div className={styles.comment_num}>{item.num}</div>
                  </a>
                );
              })}
            </div>
          </IceContainer>
        </Col>
      </Row>
    </div>
  );
};
