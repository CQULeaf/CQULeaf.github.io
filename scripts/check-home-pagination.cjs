// Run with: node scripts/check-home-pagination.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(`${__dirname}/../assets/js/home-pagination.js`, 'utf8');

function render(count, query = '', language = 'en', perPage = '6') {
  const posts = Array.from({ length: count }, () => ({ hidden: false }));
  const previous = {};
  const next = {};
  const status = {};
  const pager = {
    hidden: true,
    dataset: { perPage, pageStatus: 'Page {page} of {total}' },
    querySelector(selector) {
      return { '.home-pagination-previous': previous,
        '.home-pagination-next': next, '.home-pagination-status': status }[selector];
    }
  };
  const toggle = { href: `https://example.com/${language === 'en' ? 'zh/' : ''}` };
  vm.runInNewContext(source, {
    URL,
    window: { location: { href: `https://example.com/${language === 'zh' ? 'zh/' : ''}${query}` } },
    document: {
      querySelector: () => pager,
      querySelectorAll: () => posts,
      getElementById: () => toggle
    }
  });
  return { posts, previous, next, status, pager, toggle,
    visible: posts.flatMap((post, i) => post.hidden ? [] : [i]) };
}

for (const count of [0, 1, 6]) {
  const result = render(count);
  assert.equal(result.pager.hidden, true);
  assert.equal(result.visible.length, count);
}
const first = render(13);
assert.deepEqual(first.visible, [0, 1, 2, 3, 4, 5]);
assert.equal(first.previous.hidden, true);
assert.equal(first.next.href, '/?page=2#posts-list');
assert.equal(first.status.textContent, 'Page 1 of 3');
assert.equal(first.pager.hidden, false);

const middle = render(13, '?page=2&source=test', 'zh');
assert.deepEqual(middle.visible, [6, 7, 8, 9, 10, 11]);
assert.equal(middle.previous.href, '/zh/?source=test#posts-list');
assert.equal(middle.next.href, '/zh/?page=3&source=test#posts-list');
assert.equal(middle.toggle.href, 'https://example.com/?page=2#posts-list');

const last = render(13, '?page=999');
assert.deepEqual(last.visible, [12]);
assert.equal(last.next.hidden, true);
assert.equal(last.previous.href, '/?page=2#posts-list');
assert.equal(last.status.textContent, 'Page 3 of 3');
assert.equal(render(7, '?page=2').visible.length, 1);
assert.equal(render(12, '?page=2').visible.length, 6);
for (const query of ['?page=0', '?page=-2', '?page=oops', '?page=1.5', '?page=Infinity']) {
  assert.deepEqual(render(13, query).visible, first.visible, query);
}
assert.equal(render(13, '', 'en', '0').visible.length, 13);
console.log('Home pagination OK: page sizes, boundaries, invalid pages, language links and fallback.');
