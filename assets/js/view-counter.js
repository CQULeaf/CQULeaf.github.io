/**
 * View Counter for Jekyll Posts
 * Uses localStorage to track page views per post URL
 * Can be migrated to Google Analytics API later
 */

(function() {
  'use strict';

  // Get current post URL (works with Jekyll's permalink structure)
  var postUrl = window.location.pathname;

  // Only count on actual blog post pages (not home, archive, etc.)
  var isPostPage = postUrl.match(/\/\d{4}-\d{2}-\d{2}-/);

  if (!isPostPage) return;

  var storageKey = 'page_views_' + postUrl;
  var viewCountEl = document.querySelector('.view-count');

  // Increment and save view count
  function incrementViews() {
    var views = parseInt(localStorage.getItem(storageKey) || '0', 10);
    views++;
    localStorage.setItem(storageKey, views.toString());
    return views;
  }

  // Get current view count
  function getViews() {
    return parseInt(localStorage.getItem(storageKey) || '0', 10);
  }

  // Update view count display
  function updateDisplay() {
    var views = incrementViews();
    if (viewCountEl) {
      viewCountEl.textContent = formatNumber(views);
      viewCountEl.style.display = 'inline';
    }
  }

  // Format large numbers (e.g., 1234 -> 1.2K)
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  }

  // Initialize - count view on page load
  updateDisplay();

  // Also expose a global function to get all post views (for Most Popular page)
  window.getAllPostViews = function() {
    var views = {};
    for (var key in localStorage) {
      if (key.startsWith('page_views_')) {
        var url = key.replace('page_views_', '');
        views[url] = parseInt(localStorage.getItem(key), 10);
      }
    }
    return views;
  };

  // Expose function to get views for a specific URL (for Most Popular page)
  window.getPageViews = function(url) {
    return parseInt(localStorage.getItem('page_views_' + url) || '0', 10);
  };
})();
