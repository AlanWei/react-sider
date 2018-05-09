import urlToList from './urlToList';

test('undefined path', () => {
  expect(urlToList(undefined)).toEqual([]);
});

test('empty path', () => {
  expect(urlToList('')).toEqual([]);
});

test('simple path', () => {
  expect(urlToList('/dashboard')).toEqual(['/dashboard']);
});

test('nested path', () => {
  expect(urlToList('/dashboard/analysis/realtime')).toEqual([
    '/dashboard',
    '/dashboard/analysis',
    '/dashboard/analysis/realtime',
  ]);
});
