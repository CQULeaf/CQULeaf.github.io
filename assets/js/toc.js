/* ============================================
   Table of Contents Generator & Highlighter
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const tocContent = document.getElementById('toc-content');
  const blogPost = document.querySelector('.blog-post');

  if (!tocContent || !blogPost) return;

  // Get all headings from blog post
  const headings = blogPost.querySelectorAll('h2, h3, h4');

  if (headings.length === 0) {
    // Hide the entire TOC sidebar if no headings
    const tocSidebar = document.querySelector('.toc-sidebar');
    if (tocSidebar) tocSidebar.style.display = 'none';
    return;
  }

  // Create TOC list
  const tocList = document.createElement('ul');

  headings.forEach(function(heading, index) {
    // Generate ID if not present
    if (!heading.id) {
      heading.id = 'heading-' + index;
    }

    const level = parseInt(heading.tagName.substring(1));

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + heading.id;
    a.textContent = heading.textContent;
    a.dataset.target = heading.id;

    // Add click handler for smooth scroll
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL without jump
        history.pushState(null, null, '#' + targetId);
      }
    });

    li.appendChild(a);
    tocList.appendChild(li);
  });

  tocContent.appendChild(tocList);

  // Active section highlighter on scroll
  let currentActive = null;
  const scrollMargin = 120; // Adjust based on navbar height

  function updateActiveHeading() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    let newActive = null;

    headings.forEach(function(heading) {
      const rect = heading.getBoundingClientRect();
      const top = rect.top - scrollMargin;

      if (top <= 50 && rect.bottom > 50) {
        newActive = heading.id;
      }
    });

    if (newActive !== currentActive) {
      // Remove active class from all
      tocContent.querySelectorAll('a').forEach(function(link) {
        link.classList.remove('active');
      });

      // Add active class to current
      if (newActive) {
        const activeLink = tocContent.querySelector('a[data-target="' + newActive + '"]');
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }

      currentActive = newActive;
    }
  }

  // Initial check
  updateActiveHeading();

  // Update on scroll with throttle
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        updateActiveHeading();
        scrollTimeout = null;
      }, 50);
    }
  });

  // Also update when window resizes
  window.addEventListener('resize', updateActiveHeading);
});
