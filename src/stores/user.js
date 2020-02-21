import { request } from '@/utils/request';
import { api } from '@/utils/api';
import { decodeToken } from '@/utils/auth';

export default {
  userInfo: decodeToken() || {},
  async fetchUserInfo(id = decodeToken()._id) {
    const { data } = await request({
      url: api.getUserInfo(id).url,
    });
    if (id === decodeToken()._id) { // 说明是当前登录人
      this.userInfo = data;
    }
    return data;
  },
};
