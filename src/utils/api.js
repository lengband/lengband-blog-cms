// export const baseURL = 'http://127.0.0.1:7001/api/';
export const baseURL = '/api';

export const api = {
  login: () => '/login', // 检查用户名密码
  register: () => ({
    url: '/user/create',
    method: 'POST',
  }),
  // 类别
  getTypeList: () => ({
    url: '/type',
    method: 'GET',
  }),
  addType: () => ({
    url: '/type/create',
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
  addPost: () => ({
    url: '/post/create',
    method: 'POST',
  }),
  updatePost: id => ({
    url: `/post/${id}`,
    method: 'PATCH',
  }),
  getPostList: () => ({
    url: '/post',
    method: 'GET',
  }),
  delPost: id => ({
    url: `/post/${id}`,
    method: 'DELETE',
  }),
  getPostById: id => ({
    url: `/post/${id}`,
    method: 'GET',
  }),
  // 用户
  getUserList: () => ({
    url: '/user',
    method: 'GET',
  }),
  getUserInfo: id => ({
    url: `/user/${id}`,
    method: 'GET',
  }),
  delUser: id => ({
    url: `/user/${id}`,
    method: 'DELETE',
  }),
  addUser: () => ({
    url: '/user/create',
    method: 'POST',
  }),
  updateUser: id => ({
    url: `/user/${id}`,
    method: 'PATCH',
  }),
  // 标签
  getTagList: () => ({
    url: '/tag',
    method: 'GET',
  }),
  addTag: () => ({
    url: '/tag/create',
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
