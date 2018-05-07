import getMeunMatchKeys from './getMeunMatchKeys';
import urlToList from './urlToList';

const flatMenuKeys = [
  '/dashboard',
  '/dashboard/analysis',
  '/dashboard/analysis/realtime',
  '/dashboard/analysis/offline',
  '/dashboard/monitor',
  '/user',
  '/form',
];

test('simple path', () => {
  expect(getMeunMatchKeys(flatMenuKeys, urlToList('/dashboard'))).toEqual(['/dashboard']);
});

test('error path', () => {
  expect(getMeunMatchKeys(flatMenuKeys, urlToList('/dashboardabc'))).toEqual([]);
});

test('nested path', () => {
  expect(getMeunMatchKeys(flatMenuKeys, urlToList('/dashboard/analysis/realtime'))).toEqual([
    '/dashboard',
    '/dashboard/analysis',
    '/dashboard/analysis/realtime',
  ]);
});
