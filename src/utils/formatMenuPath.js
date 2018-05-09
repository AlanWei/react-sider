import map from 'lodash/map';

const formatMenuPath = (data, parentPath = '/') => (
  map(data, (item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
    };
    if (item.children) {
      result.children = formatMenuPath(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  })
);

export default formatMenuPath;
