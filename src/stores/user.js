import { request } from '@/utils/request';
import { api } from '@/utils/api';
import { decodeToken } from '@/utils/auth';

export default {
  userInfo: decodeToken(),
  async fetchUserInfo(id) {
    const { data } = await request({
      url: api.getUserInfo(id).url,
    });
    return data;
  },
};
