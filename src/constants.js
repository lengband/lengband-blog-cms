export const tagTypeOpts = [
  {value: 'default', label: 'grey', title: 'grey' },
  {value: 'primary', label: 'blue', title: 'blue' },
  {value: 'success', label: 'green', title: 'green' },
  {value: 'warning', label: 'yellow', title: 'yellow' },
  {value: 'info', label: 'lightblue', title: 'lightblue' },
  {value: 'danger', label: 'red', title: 'red' },
];

export const ROUTER_BASE_PATH = '/admin';

export const isDev = process.env.NODE_ENV === 'development';

export const BLOG_PREFIX = isDev ? 'http://localhost:8080/blog' : '/blog';

window.isDev = isDev;
