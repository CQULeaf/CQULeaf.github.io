/* ============================================
   Enhanced Code Blocks - Language Label & Copy
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Wait for Prism to finish highlighting
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }

  // Get all code blocks
  const codeBlocks = document.querySelectorAll('pre[class*="language-"]');

  codeBlocks.forEach(function(pre) {
    // Get the code element
    const code = pre.querySelector('code');
    if (!code) return;

    // Get language from class (e.g., language-python)
    const langClass = Array.from(pre.classList).find(cls => cls.startsWith('language-'));
    const lang = langClass ? langClass.replace('language-', '') : '';

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';

    // Add language label if language is detected
    if (lang && lang !== 'plain') {
      const label = document.createElement('span');
      label.className = 'code-lang-label';
      label.textContent = lang;
      wrapper.appendChild(label);
      pre.style.paddingTop = '2.5rem';
    }

    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-button';
    copyBtn.textContent = 'Copy';
    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');

    copyBtn.addEventListener('click', function() {
      const codeText = code.textContent;

      navigator.clipboard.writeText(codeText).then(function() {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');

        setTimeout(function() {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy:', err);
        copyBtn.textContent = 'Error';
        setTimeout(function() {
          copyBtn.textContent = 'Copy';
        }, 2000);
      });
    });

    wrapper.appendChild(copyBtn);

    // Wrap the pre element
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
  });
});
