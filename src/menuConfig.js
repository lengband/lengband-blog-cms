import { ROUTER_BASE_PATH, BLOG_PREFIX } from '@/constants';

// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: ROUTER_BASE_PATH,
    icon: 'home',
  },
  {
    name: '博客前台',
    path: BLOG_PREFIX,
    external: true,
    newWindow: true,
    icon: 'content',
  },
  {
    name: '反馈',
    path: 'https://github.com/lengband/lengband-blog-cms/issues',
    external: true,
    newWindow: true,
    icon: 'message',
  },
];

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: `${ROUTER_BASE_PATH}/dashboard`,
    icon: 'home',
    children: [
      {
        name: '监控页',
        path: `${ROUTER_BASE_PATH}/dashboard/monitor`,
      },
    ],
  },
  {
    name: '文章管理',
    path: `${ROUTER_BASE_PATH}/post`,
    icon: 'copy',
    children: [
      { name: '文章列表', path: `${ROUTER_BASE_PATH}/post/list` },
      { name: '添加文章', path: `${ROUTER_BASE_PATH}/post/create` },
    ],
  },
  {
    name: '分类管理',
    path: `${ROUTER_BASE_PATH}/cate`,
    icon: 'cascades',
    children: [
      { name: '分类列表', path: `${ROUTER_BASE_PATH}/cate/list` },
      { name: '添加分类', path: `${ROUTER_BASE_PATH}/cate/create` },
    ],
  },
  {
    name: '标签管理',
    path: `${ROUTER_BASE_PATH}/tag`,
    icon: 'pin',
    children: [
      { name: '标签列表', path: `${ROUTER_BASE_PATH}/tag/list` },
      { name: '添加标签', path: `${ROUTER_BASE_PATH}/tag/create` },
    ],
  },
  {
    name: '用户管理',
    path: `${ROUTER_BASE_PATH}/users`,
    icon: 'yonghu',
    children: [
      { name: '用户列表', path: `${ROUTER_BASE_PATH}/users/list` },
      { name: '添加用户', path: `${ROUTER_BASE_PATH}/users/create` },
      { name: '修改密码', path: `${ROUTER_BASE_PATH}/users/pwd` },
    ],
  },
  {
    name: '通用设置',
    path: `${ROUTER_BASE_PATH}/setting`,
    icon: 'shezhi',
    children: [
      { name: '基础设置', path: `${ROUTER_BASE_PATH}/setting/basic` },
      {
        name: '菜单设置',
        path: `${ROUTER_BASE_PATH}/setting/navigation`,
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
