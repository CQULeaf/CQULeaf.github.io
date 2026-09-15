// Run with: node scripts/check-copy-text.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(`${__dirname}/../assets/js/copy-text.js`, 'utf8');

(async () => {
  for (const value of ['cquleaf', 'https://yexuhang.com/feed.xml']) {
    for (const outcome of ['success', 'denied', 'unavailable']) {
      let click;
      let copied;
      const status = {};
      const button = {
        dataset: { copyText: value, copySuccess: 'Copied', copyError: 'Copy manually' },
        parentElement: { querySelector: () => status },
        addEventListener: (event, handler) => { click = handler; }
      };
      vm.runInNewContext(source, {
        document: { querySelectorAll: () => [button] },
        navigator: outcome === 'unavailable' ? {} : {
          clipboard: { writeText: async text => {
            if (outcome === 'denied') throw new Error('Permission denied');
            copied = text;
          } }
        }
      });
      await click();
      assert.equal(status.textContent, outcome === 'success' ? 'Copied' : 'Copy manually');
      assert.equal(copied, outcome === 'success' ? value : undefined);
    }
  }
  console.log('Copy checks passed: WeChat ID and feed URL; success, denied, unavailable.');
})();
