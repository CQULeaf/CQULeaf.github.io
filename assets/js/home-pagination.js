(function () {
  const pager = document.querySelector('.home-pagination');
  if (!pager) return;

  // ponytail: all previews still load; use build-time language pagination if feed size becomes a bottleneck.
  const posts = Array.from(document.querySelectorAll('#posts-list > .post-preview'));
  const perPage = Number(pager.dataset.perPage);
  if (!Number.isInteger(perPage) || perPage < 1) return;

  const totalPages = Math.ceil(posts.length / perPage);
  if (totalPages <= 1) return;

  const url = new URL(window.location.href);
  const requestedPage = Number(url.searchParams.get('page'));
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, totalPages) : 1;
  const start = (currentPage - 1) * perPage;
  posts.forEach((post, index) => {
    post.hidden = index < start || index >= start + perPage;
  });

  pager.querySelector('.home-pagination-status').textContent = pager.dataset.pageStatus
    .replace('{page}', currentPage).replace('{total}', totalPages);

  for (const [selector, target] of [
    ['.home-pagination-previous', currentPage - 1],
    ['.home-pagination-next', currentPage + 1]
  ]) {
    const link = pager.querySelector(selector);
    link.hidden = target < 1 || target > totalPages;
    if (!link.hidden) {
      const targetUrl = new URL(url);
      if (target === 1) targetUrl.searchParams.delete('page');
      else targetUrl.searchParams.set('page', target);
      targetUrl.hash = 'posts-list';
      link.href = targetUrl.pathname + targetUrl.search + targetUrl.hash;
    }
  }

  const languageToggle = document.getElementById('language-toggle');
  if (languageToggle && currentPage > 1) {
    const targetUrl = new URL(languageToggle.href);
    targetUrl.searchParams.set('page', currentPage);
    targetUrl.hash = 'posts-list';
    languageToggle.href = targetUrl.href;
  }
  pager.hidden = false;
})();
