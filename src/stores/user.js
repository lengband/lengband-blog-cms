import { request } from '@/utils/request';
import { api } from '@/utils/api';
import { decodeToken } from '@/utils/auth';

export default {
  userInfo: decodeToken(),
  async fetchUserInfo(id) {
    const userMsg = decodeToken();
    console.log(userMsg, 'userMsg');
    const { data } = await request({
      url: api.getUserInfo(id),
      method: 'post',
    });
    return data;
  },
};
