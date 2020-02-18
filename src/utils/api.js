// export const baseURL = 'http://127.0.0.1:7001/api/';
export const baseURL = '/api/';

export const api = {
  login: () => '/login', // 检查用户名密码

  getTypeList: () => '/type', // 获得文章类别列表
  addType: () => 'type/create',

  addArticle: () => '/article/create', // 添加文章
  updateArticle: id => `/article/${id}`, // :id 修改文章第
  getArticleList: () => 'article', // 文章列表
  delArticle: id => `delArticle/${id}`, // 删除文章
  getArticleById: id => `article/${id}`, // 根据ID获得文章详情

  getUserList: () => 'user',
  getUserInfo: id => `user/${id}`,

  getTagList: () => 'tag',
  addTag: () => 'tag/create',
  updateTag: id => ({
    url: `tag/${id}`,
    method: 'PATCH',
  }),
  delTag: id => ({
    url: `tag/${id}`,
    method: 'DELETE',
  }),
};
