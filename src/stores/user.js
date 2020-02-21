import { request } from '@/utils/request';
import { api } from '@/utils/api';
import { decodeToken } from '@/utils/auth';

const tokenInfo = decodeToken();

export default {
  userInfo: tokenInfo || {},
  async fetchUserInfo(id = tokenInfo._id) {
    const { data } = await request({
      url: api.getUserInfo(id).url,
    });
    if (id === tokenInfo._id) { // 说明是当前登录人
      this.userInfo = data;
    }
    return data;
  },
};
