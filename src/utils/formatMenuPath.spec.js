import formatMenuPath from './formatMenuPath';

test('empty menu', () => {
  expect(formatMenuPath([])).toEqual([]);
});

test('simple menu', () => {
  const simpleMenu = [{
    path: 'dashboard',
  }, {
    path: 'user',
  }, {
    path: 'form',
  }];

  expect(formatMenuPath(simpleMenu)).toEqual([{
    path: '/dashboard',
  }, {
    path: '/user',
  }, {
    path: '/form',
  }]);
});


test('nested menu', () => {
  const nestedMenu = [{
    path: 'dashboard',
    children: [{
      path: 'analysis',
      children: [{
        path: 'realtime',
      }, {
        path: 'offline',
      }],
    }, {
      path: 'monitor',
    }],
  }, {
    path: 'user',
  }, {
    path: 'form',
  }];

  expect(formatMenuPath(nestedMenu)).toEqual([{
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
  }]);
});
