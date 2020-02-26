import { request } from '@/utils/request';
import { api } from '@/utils/api';
import { decodeToken } from '@/utils/auth';

export default {
  userInfo: decodeToken() || {},
  async fetchUserInfo(id = decodeToken() ? decodeToken()._id : null) {
    const { data } = await request({
      url: api.getUserInfo(id).url,
    });
    const token = decodeToken();
    if (!id || !token) {
      return {};
    }
    if (id === token._id) { // 说明是当前登录人
      this.userInfo = data;
    }
    return data;
  },
};
