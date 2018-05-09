import getFlatMenuKeys from './getFlatMenuKeys';

test('empty menu', () => {
  expect(getFlatMenuKeys([])).toEqual([]);
});

test('flat menu', () => {
  const simpleMenu = [{
    path: '/dashboard',
  }, {
    path: '/user',
  }, {
    path: '/form',
  }];
  expect(getFlatMenuKeys(simpleMenu)).toEqual(['/dashboard', '/user', '/form']);
});

test('nested menu', () => {
  const nestedMenu = [{
    path: '/dashboard',
    children: [{
      path: '/dashboard/analysis',
      children: [{
        path: '/dashboard/analysis/realtime',
      }, {
        path: '/dashboard/analysis/offline',
      }],
    }, {
      path: '/dashboard/monitor',
    }],
  }, {
    path: '/user',
  }, {
    path: '/form',
  }];
  expect(getFlatMenuKeys(nestedMenu)).toEqual([
    '/dashboard',
    '/dashboard/analysis',
    '/dashboard/analysis/realtime',
    '/dashboard/analysis/offline',
    '/dashboard/monitor',
    '/user',
    '/form',
  ]);
});
