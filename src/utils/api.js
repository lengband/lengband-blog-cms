// export const baseURL = 'http://127.0.0.1:7001/api/';
export const baseURL = '/api';

export const api = {
  login: () => '/login', // 检查用户名密码
  // 类别
  getTypeList: () => ({
    url: '/type',
    method: 'GET',
  }),
  addType: () => ({
    url: 'type/create',
    method: 'POST',
  }),
  updateType: id => ({
    url: `/type/${id}`,
    method: 'PATCH',
  }),
  delType: id => ({
    url: `/type/${id}`,
    method: 'DELETE',
  }),
  // 文章
  addArticle: () => ({
    url: '/article/create',
    method: 'POST',
  }),
  updateArticle: id => ({
    url: `/article/${id}`,
    method: 'PATCH',
  }),
  getArticleList: () => ({
    url: '/article',
    method: 'GET',
  }),
  delArticle: id => ({
    url: `/article/${id}`,
    method: 'DELETE',
  }),
  getArticleById: id => ({
    url: `/article/${id}`,
    method: 'GET',
  }),
  // 用户
  getUserList: () => ({
    url: '/user',
    method: 'GET',
  }),
  getUserInfo: id => ({
    URL: `/user/${id}`,
    method: 'GET',
  }),
  delUser: id => ({
    url: `/user/${id}`,
    method: 'DELETE',
  }),
  addUser: () => ({
    url: 'user/create',
    method: 'POST',
  }),
  // 标签
  getTagList: () => ({
    url: '/tag',
    method: 'GET',
  }),
  addTag: () => ({
    url: 'tag/create',
    method: 'POST',
  }),
  updateTag: id => ({
    url: `/tag/${id}`,
    method: 'PATCH',
  }),
  delTag: id => ({
    url: `/tag/${id}`,
    method: 'DELETE',
  }),
};
