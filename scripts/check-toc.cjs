// Run with: node scripts/check-toc.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(`${__dirname}/../assets/js/toc.js`, 'utf8');

function element(tagName) {
  return {
    tagName, children: [], dataset: {}, style: {},
    appendChild(child) { this.children.push(child); },
    querySelector(tag) { return this.children.find(child => child.tagName === tag); },
    querySelectorAll() { return []; },
    addEventListener() {},
    getBoundingClientRect() { return { top: 1000, bottom: 1030 }; }
  };
}

for (const [levels, expected] of [
  [[2, 3, 3, 2, 3, 4, 3, 2], [null, 0, 0, null, 3, 4, 3, null]],
  [[3, 4, 2, 4, 3], [null, 0, null, 2, 2]],
  [[2, 2], [null, null]],
  [[], []]
]) {
  const headings = levels.map((level, i) => ({
    ...element(`H${level}`), id: `heading-${i}`, textContent: `Heading ${i}`
  }));
  const toc = element('div');
  const sidebar = element('aside');
  vm.runInNewContext(source, {
    document: {
      addEventListener(event, handler) { handler(); },
      getElementById(id) { return id === 'toc-content' ? toc : sidebar; },
      querySelector(selector) {
        return selector === '.toc-sidebar' ? sidebar : { querySelectorAll: () => headings };
      },
      createElement: element
    },
    window: { addEventListener() {} }
  });
  if (!levels.length) {
    assert.equal(sidebar.style.display, 'none');
    continue;
  }
  const actual = [];
  function walk(list, parent = null) {
    for (const li of list.children) {
      const index = Number(li.children[0].dataset.target.replace('heading-', ''));
      actual[index] = parent;
      assert.equal(li.className, `toc-level-${levels[index]}`);
      const nested = li.querySelector('ul');
      if (nested) walk(nested, index);
    }
  }
  walk(toc.children[0]);
  assert.deepEqual(actual, expected, `Heading levels: ${levels}`);
}
console.log('TOC hierarchy OK: siblings, nested headings, skipped levels, empty article.');
