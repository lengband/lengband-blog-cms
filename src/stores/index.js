import Store from '@ice/store';
import user from './user';

const storeManager = new Store();
const stores = storeManager.registerStores({
  user,
});

export default stores;
